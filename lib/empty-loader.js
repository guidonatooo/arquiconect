/**
 * Webpack loader that returns a minimal valid Next.js page component.
 * Used to prevent Next.js from compiling legacy Vite/React source files
 * in the src/ directory, which belong to a different project.
 */
module.exports = function emptyLoader() {
  // Return a minimal valid page component so Next.js doesn't complain
  // about missing default exports in src/pages/
  return 'export default function _Empty() { return null; }'
}
