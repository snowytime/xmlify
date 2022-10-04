/**
 * helper that converts all the following into snake_case
 * -- PascalCase -> snake_case
 * -- kebab-case -> snake_case
 * -- camelCase -> snake_case
 */
export const toSnakeCase = (str: string) => {
    if (/(?:_)|(?:-)/.test(str)) {
        // we this word is most likely snake_case
        str = str.replace(/([-][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "")
        );
    }
    return str
        .replace(/\d+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_");
};
