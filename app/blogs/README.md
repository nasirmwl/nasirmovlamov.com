# MDX Blog System

This directory contains all your blog posts written in MDX format.

## 📝 Creating a New Blog Post

1. **Copy the template:**
   ```bash
   cp blog-template.mdx your-new-post-slug.mdx
   ```

2. **Edit the frontmatter:**
   Update the metadata at the top of the file:
   ```yaml
   ---
   title: "Your Blog Post Title"
   date: "2024-01-01"
   description: "A brief description of your blog post"
   author: "Your Name"
   tags: ["Tag1", "Tag2", "Tag3"]
   lang: "en"
   ---
   ```

3. **Write your content:**
   Use standard Markdown/MDX syntax below the frontmatter.

4. **Save the file:**
   The filename (without `.mdx`) will be used as the URL slug.
   Example: `my-awesome-post.mdx` → `/blog/my-awesome-post`

## 🎨 Supported Features

### Headers
```markdown
# H1 - Main Title
## H2 - Section
### H3 - Subsection
#### H4 - Smaller heading
##### H5 - Even smaller
```

### Text Formatting
- **Bold**: `**text**`
- *Italic*: `*text*`
- `Inline code`: `` `code` ``

### Code Blocks
````markdown
```javascript
const greeting = "Hello World";
console.log(greeting);
```
````

### Lists
```markdown
Unordered:
- Item 1
- Item 2

Ordered:
1. First
2. Second
```

### Links and Images
```markdown
[Link Text](https://example.com)
![Alt Text](image-url.jpg)
```

### Blockquotes
```markdown
> This is a quote
```

## 📂 File Structure

```
app/blogs/
├── README.md                           # This file
├── blog-template.mdx                   # Template for new posts
├── chat-gpt-is-not-available-eng.mdx  # Example blog post
└── chat-gpt-is-not-available-az.mdx   # Example blog post
```

## 🔧 Technical Details

- **Frontmatter Fields:**
  - `title` (required): Post title
  - `date` (required): Publication date (YYYY-MM-DD)
  - `description` (required): Brief description
  - `author` (optional): Author name
  - `tags` (optional): Array of tags
  - `lang` (optional): Language code (en, az, etc.)

- **Routing:**
  - Blog listing: `/blog`
  - Individual post: `/blog/[slug]`

- **Styling:**
  Custom styled components are applied automatically via `MDXComponents.tsx`

## 🚀 Deployment

After creating or editing a blog post:

1. The site needs to be rebuilt to generate static pages
2. Run: `npm run build`
3. Deploy the built files

## 💡 Tips

- Keep filenames lowercase with hyphens (e.g., `my-blog-post.mdx`)
- Use descriptive slugs for SEO
- Add relevant tags for better organization
- Include a compelling description for the blog listing page
- Test locally before deploying: `npm run dev`

## 🐛 Troubleshooting

**Post not showing up?**
- Check that the file has `.mdx` extension
- Verify frontmatter is properly formatted (YAML syntax)
- Ensure all required fields are present
- Restart the dev server after creating new files

**Styling issues?**
- Custom components are defined in `app/components/modules/blog/MDXComponents.tsx`
- Modify those components to change the appearance

**Build errors?**
- Check for syntax errors in your MDX content
- Ensure all frontmatter values are properly quoted
- Verify that dates are in YYYY-MM-DD format

