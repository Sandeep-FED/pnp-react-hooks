const commonjs = require('@rollup/plugin-commonjs');
const del = require('rollup-plugin-delete');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const { visualizer } = require('rollup-plugin-visualizer');

const outputOptions = {
    dir: "dist",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src"
};

async function build()
{
    // create a bundle
    const bundle = await rollup.rollup({
        plugins: [
            del({ targets: 'dist/*' }),
            typescript(),
            commonjs(),
            nodeResolve(),
            visualizer(),
        ],
        input: "src/index.ts",

        external: [
            "react",
            "@pnp/sp/items",
            "@pnp/sp/lists",
            "@pnp/sp/webs",
            "@pnp/sp/site-users",
            "@pnp/sp"
        ]
    });

    await bundle.generate(outputOptions);

    await bundle.write(outputOptions);

    await bundle.close();
}

build();