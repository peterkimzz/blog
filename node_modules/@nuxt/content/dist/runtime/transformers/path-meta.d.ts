declare const _default: import("../types").ContentTransformer;
export default _default;
/**
 * Generate path from file name
 *
 * @param path file full path
 * @returns generated slug
 */
export declare const generatePath: (path: string, { forceLeadingSlash, respectPathCase }?: {
    forceLeadingSlash?: boolean | undefined;
    respectPathCase?: boolean | undefined;
}) => string;
/**
 * generate title from file path
 */
export declare const generateTitle: (path: string) => string;
/**
 * Clean up special keywords from path part
 */
export declare function refineUrlPart(name: string): string;
