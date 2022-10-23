# Swagger Typescript API (Formatted)

This is a wrapper around the `swagger-typescript-api` package that adds extra formatting to the output to ensure that all types are read-only.

## Why?

`swagger-typescript-api` is a really impressive package, but it has some limitations.

1. The ability to define all types as readonly is only supported by the CLI command, not the NodeJS API.
2. The CLI command has some weird issue where it seems to expect Windows line endings and errors out.

Therefore I took the NodeJS API and wrote my own formatting logic around it.

## How to Use

Install the package and use the following command:

```bash
craig-swagger {name} {url}
```