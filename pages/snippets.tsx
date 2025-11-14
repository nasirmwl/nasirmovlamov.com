import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';

const NotesContainer = styled.div`
  max-width: 800px;
  padding: 3rem 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.15;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: 2.75rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.625rem 1.25rem;
  background: ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  color: ${(props) => props.$active ? '#ffffff' : props.theme.colors.textSecondary};
  border: 1px solid ${(props) => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.$active ? props.theme.colors.primaryHover : props.theme.colors.backgroundTertiary};
    color: ${(props) => props.$active ? '#ffffff' : props.theme.colors.text};
    border-color: ${(props) => props.$active ? props.theme.colors.primaryHover : props.theme.colors.borderMedium};
  }
`;

const NotesGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NoteCard = styled.article`
  padding: 2rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NoteTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const NoteTag = styled.span`
  padding: 0.375rem 0.875rem;
  background: ${(props) => props.theme.colors.primary}15;
  color: ${(props) => props.theme.colors.primary};
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const NoteContent = styled.div`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 1rem;

  code {
    background: ${(props) => props.theme.colors.codeBackground};
    color: ${(props) => props.theme.colors.codeText};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.9375rem;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }
`;

const CodeBlock = styled.pre`
  background: ${(props) => props.theme.colors.codeBackground};
  padding: 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.colors.codeBorder};

  code {
    color: ${(props) => props.theme.colors.codeText};
    font-size: 0.9375rem;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    line-height: 1.6;
  }
`;

const NoteDate = styled.time`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

interface Note {
  id: string;
  title: string;
  content: string;
  code?: string;
  tag: string;
  date: string;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'Micro-Frontend Module Federation',
    content: 'When working with Webpack Module Federation, always version your shared dependencies explicitly. This prevents runtime errors when different micro-frontends use incompatible versions.',
    code: `// webpack.config.js
new ModuleFederationPlugin({
  shared: {
    react: { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.0.0' }
  }
})`,
    tag: 'Micro-frontends',
    date: '2024-11-10'
  },
  {
    id: '2',
    title: 'React Testing Library Best Practice',
    content: 'Test user behavior, not implementation details. Query by accessibility attributes (role, label) rather than test IDs when possible. This ensures your tests remain valuable even when refactoring.',
    code: `// ✅ Good - Tests user behavior
const button = screen.getByRole('button', { name: /submit/i });

// ❌ Avoid - Tests implementation details
const button = container.querySelector('.submit-btn');`,
    tag: 'Testing',
    date: '2024-11-09'
  },
  {
    id: '3',
    title: 'CSS-in-JS Performance Optimization',
    content: 'When using styled-components, avoid creating styled components inside render methods. This causes unnecessary re-creation on every render and impacts performance.',
    code: `// ❌ Bad - Creates new component every render
const MyComponent = () => {
  const StyledDiv = styled.div\`color: red;\`;
  return <StyledDiv />;
}

// ✅ Good - Create outside component
const StyledDiv = styled.div\`color: red;\`;
const MyComponent = () => <StyledDiv />;`,
    tag: 'React',
    date: '2024-11-08'
  },
  {
    id: '4',
    title: 'TypeScript Utility Types',
    content: 'Use Pick and Omit utility types to create derived types. This keeps your types DRY and maintains a single source of truth.',
    code: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Create a public user type without sensitive data
type PublicUser = Omit<User, 'password'>;

// Create a type for user creation
type CreateUser = Pick<User, 'name' | 'email' | 'password'>;`,
    tag: 'TypeScript',
    date: '2024-11-07'
  },
  {
    id: '5',
    title: 'React Hook Dependencies',
    content: 'Always include all dependencies in useEffect and useCallback. Use ESLint exhaustive-deps rule to catch missing dependencies early.',
    code: `// ❌ Avoid
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId dependency

// ✅ Correct
useEffect(() => {
  fetchData(userId);
}, [userId]);`,
    tag: 'React',
    date: '2024-11-06'
  },
  {
    id: '6',
    title: 'Git Commit Message Convention',
    content: 'Follow conventional commits for better changelog generation and semantic versioning. Format: type(scope): subject',
    code: `feat(auth): add OAuth2 login flow
fix(api): resolve null pointer in user service
docs(readme): update installation instructions
test(user): increase coverage to 85%
refactor(utils): simplify date formatting logic`,
    tag: 'Git',
    date: '2024-11-05'
  },
  {
    id: '7',
    title: 'React Performance: useMemo vs useCallback',
    content: 'useMemo memoizes a computed value, useCallback memoizes a function. Use them to prevent unnecessary re-renders in child components.',
    code: `// useMemo - for expensive calculations
const sortedItems = useMemo(() => 
  items.sort((a, b) => a.price - b.price), 
  [items]
);

// useCallback - for function references
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);`,
    tag: 'React',
    date: '2024-11-04'
  },
  {
    id: '8',
    title: 'API Error Handling Pattern',
    content: 'Implement a consistent error handling pattern across your application. Create custom error classes for different error types.',
    code: `class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new APIError(
      'Failed to fetch data', 
      response.status
    );
  }
  return response.json();
}`,
    tag: 'JavaScript',
    date: '2024-11-03'
  },
  {
    id: '9',
    title: 'Custom React Hook Pattern',
    content: 'Extract complex logic into custom hooks for reusability and better separation of concerns. Follow the "use" prefix convention.',
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    tag: 'React',
    date: '2024-11-02'
  },
  {
    id: '10',
    title: 'Webpack Bundle Analysis',
    content: 'Regularly analyze your bundle size to identify large dependencies. Use webpack-bundle-analyzer to visualize your bundle composition.',
    code: `// webpack.config.js
const BundleAnalyzerPlugin = 
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};`,
    tag: 'Webpack',
    date: '2024-11-01'
  },
  {
    id: '11',
    title: 'Accessibility: Semantic HTML',
    content: 'Use semantic HTML elements for better accessibility and SEO. Screen readers rely on proper semantic structure.',
    code: `// ❌ Avoid
<div onClick={handleClick}>Click me</div>

// ✅ Better
<button onClick={handleClick}>Click me</button>

// ✅ Semantic structure
<article>
  <header><h1>Title</h1></header>
  <section><p>Content</p></section>
  <footer><time>2024-11-10</time></footer>
</article>`,
    tag: 'Accessibility',
    date: '2024-10-31'
  },
  {
    id: '12',
    title: 'Environment Variables Security',
    content: 'Never commit sensitive environment variables. Use NEXT_PUBLIC_ prefix only for client-side variables in Next.js.',
    code: `// .env (server-side only)
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123

// .env (client-side accessible)
NEXT_PUBLIC_API_URL=https://api.example.com

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ Client
const dbUrl = process.env.DATABASE_URL; // ✅ Server only`,
    tag: 'Security',
    date: '2024-10-30'
  }
];

const Snippets: NextPage = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', ...Array.from(new Set(notes.map(note => note.tag)))];

  const filteredNotes = selectedTag === 'All' 
    ? notes 
    : notes.filter(note => note.tag === selectedTag);

  return (
    <NotesContainer>
      <Header>
        <Title>Notes</Title>
        <Subtitle>
          Quick tips, code snippets, and lessons learned from building software. 
          A collection of practical knowledge from my daily work.
        </Subtitle>
        
        <FilterContainer>
          {tags.map(tag => (
            <FilterButton
              key={tag}
              $active={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </FilterButton>
          ))}
        </FilterContainer>
      </Header>

      <NotesGrid>
        {filteredNotes.map(note => (
          <NoteCard key={note.id}>
            <NoteHeader>
              <div>
                <NoteTitle>{note.title}</NoteTitle>
                <NoteDate>{new Date(note.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}</NoteDate>
              </div>
              <NoteTag>{note.tag}</NoteTag>
            </NoteHeader>
            <NoteContent>{note.content}</NoteContent>
            {note.code && (
              <CodeBlock>
                <code>{note.code}</code>
              </CodeBlock>
            )}
          </NoteCard>
        ))}
      </NotesGrid>
    </NotesContainer>
  );
};

export default Snippets;
