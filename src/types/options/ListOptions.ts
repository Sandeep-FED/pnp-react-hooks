export enum ListOptions
{
    /**
     * Fetch data in single request. Request might fail with treshold limit, if data is not indexed and filtered properly.
     * see https://docs.microsoft.com/en-us/microsoft-365/community/large-lists-large-libraries-in-sharepoint
     */
    Default = 0,

    /**
     * Fetch data in multiple calls and merge each page on client side. 
     */
    All = 1,
}