import {
  copyFileSync,
  mkdirSync,
  rmSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { argv } from "node:process";
import { join, parse } from "node:path";

/**
 * Returns project root directory by checking first package.json on parent dirs.
 * @param {number} [max_depth=3] -
 * @returns {string}
 */
function get_root_dir(max_depth) {
  let project_dir = parse(argv[1]).dir;
  let current_depth = 0;

  while (!existsSync(join(project_dir, "package.json"))) {
    project_dir = parse(project_dir).dir;
    current_depth += 1;

    if (current_depth >= max_depth) {
      throw new Error(
        "Exceeding the depth check. Script is either nested to much or it's not part of a package.",
      );
    }
  }

  return project_dir;
}

/**
 * Clears target directory inside the "project root" with strict checks.
 * @param {string} target
 */
function delete_project_dir(target) {
  const project_dir = get_root_dir();
  const target_dir = join(project_dir, target);

  if (existsSync(target_dir)) {
    rmSync(target_dir, {
      recursive: true,
    });
  }
}

/**
 * Clones hand-crafted .d.ts files to target types folder.
 * @param {string} source_path
 * @param {string} target_path
 */
function copy_extra_types(source_path, target_path) {
  console.log("Cloning custom types.");

  const files = readdirSync(source_path, {
    recursive: true,
  }).filter((/** @type{string | Buffer}  **/ e) => {
    const path = parse(e);
    return path.ext === ".ts" && path.base.endsWith(".d.ts");
  });

  for (const file of files) {
    const source_file = join(source_path, file);
    const target_file = join(target_path, file);
    const base_dir = parse(target_file).dir;

    mkdirSync(base_dir, { recursive: true });

    console.log(`Cloning ${source_file} -> ${target_file}`);
    copyFileSync(source_file, target_file);
  }
}

try {
  delete_project_dir("./types");
  copy_extra_types("./src", "./types");
} catch (err) {
  console.error(err);
  process.exit(1);
}
