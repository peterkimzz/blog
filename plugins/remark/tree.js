module.exports = function () {
  return async (tree, { data }) => {
    // console.log(tree.children.length, '\n\n')

    for (const child of tree.children) {
      if (child.lang === 'html') {
        // console.log(child)
      }

      // if (/^diff-*/.test(child.lang)) {
      //   console.log(child)
      // }
    }

    // console.log({ data })
    return tree
  }
}
