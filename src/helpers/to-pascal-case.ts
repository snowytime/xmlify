/**
 * helper that converts all the following into PascalCase
 * -- snake_case -> PascalCase
 * -- kebab-case -> PascalCase
 * -- camelCase -> PascalCase
 */
export const toPascalCase = (str: string) => {
    if (typeof str !== "string") return str;
    // lets just capitalize the first letter right off the bat
    str = str.charAt(0).toUpperCase() + str.slice(1);
    if (/(?:_)|(?:-)/.test(str)) {
        // we this word is most likely snake_case
        return str.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
        );
    }
    return str
        .replace(/(?:^\w|[A-Z]|[_-]|\b\w)/g, (word, index) => {
            return word.toUpperCase();
        })
        .replace(/\s+/g, "");
};
