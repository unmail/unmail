# Installation

Install `@unmail/react` or `@unmail/vue` in your project.

## React

<PackageManagerTabs package="@unmail/react" />

### Peer dependencies

`@unmail/react` requires the following peer dependencies:

| Package | Version |
|---------|---------|
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |

Optional peer dependencies (only needed if you use the corresponding features):

| Package | Feature |
|---------|---------|
| `prettier` | `render({ pretty: true })` |
| `html-to-text` | `render({ plainText: true })` |

## Vue

<PackageManagerTabs package="@unmail/vue" />

### Peer dependencies

`@unmail/vue` requires the following peer dependencies:

| Package | Version |
|---------|---------|
| `vue` | `>=3.3.0` |

Optional peer dependencies:

| Package | Feature |
|---------|---------|
| `prettier` | `render(component, props, { pretty: true })` |
| `html-to-text` | `render(component, props, { plainText: true })` |
