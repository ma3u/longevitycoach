# Longevity Coach - Documentation Style Guide

This style guide establishes standards for writing and maintaining documentation across the Longevity Coach project.

## General Principles

- **Clarity**: Write clearly and concisely
- **Consistency**: Follow established patterns
- **Accessibility**: Ensure content is accessible to all team members
- **Maintainability**: Structure content for easy updates

## Markdown Formatting

### Headers

```markdown
# H1 - Document Title
## H2 - Main Section
### H3 - Subsection
#### H4 - Sub-subsection
```

### Text Formatting

- **Bold** for UI elements and important concepts
- *Italic* for emphasis or document titles
- `Code` for file names, paths, and commands
- Use > for notes and warnings

### Lists

Use ordered lists for sequential steps, unordered for other items:

```markdown
1. First step
2. Second step
   - Sub-item
   - Another sub-item
3. Third step
```

### Code Blocks

Use fenced code blocks with language specification:

````markdown
```javascript
function example() {
  console.log('Hello, World!');
}
```

```bash
npm install
npm start
```
````

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Writing Style

### Voice and Tone

- Use active voice
- Address the reader as "you"
- Keep sentences short and direct
- Use present tense

### Terminology

- Use consistent terminology (refer to the [Glossary](./glossary.md))
- Define acronyms on first use
- Use industry-standard terms when available

### Guidelines for Specific Document Types

#### README Files

1. Project overview and purpose
2. Quick start guide
3. Installation instructions
4. Basic usage examples
5. Link to detailed documentation

#### API Documentation

- Clear endpoint descriptions
- Request/response examples
- Error codes and handling
- Authentication requirements

#### Architecture Decision Records (ADRs)

Follow the template in [memory-bank/decisions/README.md](../memory-bank/decisions/README.md)

## Documentation Structure

### File Naming

- Use kebab-case for file names
- Be descriptive but concise
- Examples:
  - `setup-guide.md`
  - `api-endpoints.md`
  - `deployment-guide.md`

### Directory Structure

```
docs/
├── guides/          # How-to guides
├── reference/       # API and technical reference
├── architecture/    # System architecture docs
├── decisions/       # ADRs
└── images/          # Documentation images
```

## Code Examples

### Best Practices

- Include complete, working examples
- Show error handling
- Include necessary imports
- Keep examples focused and relevant

### Commenting

- Use JSDoc for JavaScript/TypeScript
- Include parameter and return types
- Document complex business logic
- Keep comments up-to-date with code changes

## Review Process

1. All documentation changes require PR review
2. Use the "docs" label for documentation PRs
3. Ensure all links work
4. Verify code examples are accurate
5. Check for consistent formatting

## Documentation Tools

- **Markdown Linter**: Ensure consistent formatting
- **Spell Checker**: Catch typos and misspellings
- **Link Checker**: Verify all links are valid
- **Visual Studio Code**: Recommended editor with Markdown extensions

## Versioning

- Include last updated date at the bottom of each document
- Use semantic versioning for API documentation
- Document breaking changes clearly

## Accessibility

- Use descriptive link text (not "click here")
- Add alt text to images
- Use proper heading hierarchy
- Ensure sufficient color contrast

---
Last updated: June 11, 2025
