import next from "eslint-config-next"

const config = [
  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**"],
  },
  ...next,
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]

export default config
