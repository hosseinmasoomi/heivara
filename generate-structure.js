const fs = require("fs");
const path = require("path");

const IGNORED_DIRS = new Set(["node_modules", ".git", ".next", "dist", "out"]);

function printTree(dirPath, prefix = "", depth = 0) {
  if (depth > 15) return ""; // جلوگیری از عمق زیاد

  let tree = "";
  let items;
  try {
    items = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (err) {
    return "";
  }

  const filteredItems = items.filter(
    (item) => !IGNORED_DIRS.has(item.name.toLowerCase())
  );

  const sorted = filteredItems.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  sorted.forEach((item, index) => {
    const isLast = index === sorted.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const fullPath = path.join(dirPath, item.name);

    tree += `${prefix}${connector}${item.name}\n`;

    if (item.isDirectory()) {
      tree += printTree(
        fullPath,
        prefix + (isLast ? "    " : "│   "),
        depth + 1
      );
    }
  });

  return tree;
}

const root = process.argv[2] || ".";
const fullPath = path.resolve(root);

console.log(`\n📁 Structure of: ${fullPath}\n`);
console.log(printTree(fullPath));
