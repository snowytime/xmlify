interface Builder {
    tree: {
        [key: string]: string;
    };
    mutator?: (property: string) => string;
}
export const builder = ({ tree, mutator }: Builder) => {
    let xml = "";
    const dataTree = Object.entries(tree);
    dataTree.map((entry) => {
        const key = entry[0];
        const content = entry[1];
        xml += `<${mutator ? mutator(key) : key}>${
            typeof content === "object" ? builder(content) : content
        }</${mutator ? mutator(key) : key}>`;
    });
    return xml;
};
