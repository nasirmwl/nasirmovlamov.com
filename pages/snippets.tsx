import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import { LAYOUT_CONSTANTS } from '@styles/layout-constants';

const NotesContainer = styled.div`
  max-width: 800px;
  padding: 4rem 2rem;
  width: 100%;
  margin: 0 auto;
  
  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    padding: 2rem 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
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

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    font-size: 2.75rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.75;
  margin-bottom: 2rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
    margin-bottom: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
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

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
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

  @media (max-width: ${LAYOUT_CONSTANTS.MOBILE_BREAKPOINT}px) {
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
`;

const Quote = styled.blockquote`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-left: 4px solid ${(props) => props.theme.colors.primary};
  padding: 1.25rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-style: italic;
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
`;

const NoteDate = styled.time`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};
`;

interface Note {
  id: string;
  title: string;
  content: string;
  quote?: string;
  tag: string;
  date: string;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'The Power of Compound Growth',
    content: 'Small, consistent improvements compound over time. Getting 1% better each day leads to being 37x better in a year. Focus on sustainable daily progress rather than dramatic overnight changes.',
    quote: 'Success is the sum of small efforts repeated day in and day out.',
    tag: 'Growth',
    date: '2024-11-10'
  },
  {
    id: '2',
    title: 'Deep Work Over Busy Work',
    content: 'Not all hours are created equal. One hour of focused, uninterrupted deep work can be more valuable than a full day of shallow tasks. Protect your deep work time fiercely.',
    quote: 'The ability to perform deep work is becoming increasingly rare and therefore increasingly valuable.',
    tag: 'Productivity',
    date: '2024-11-09'
  },
  {
    id: '3',
    title: 'Identity-Based Habits',
    content: 'Instead of focusing on goals, focus on becoming the type of person who achieves those goals. Don\'t say "I want to run a marathon", say "I am a runner". Identity change precedes behavior change.',
    quote: 'Every action you take is a vote for the type of person you wish to become.',
    tag: 'Habits',
    date: '2024-11-08'
  },
  {
    id: '4',
    title: 'Learn in Public',
    content: 'Document your learning journey publicly. Writing about what you learn deepens your understanding, builds your network, and creates a knowledge base for others. Don\'t wait until you\'re an expert.',
    quote: 'The best way to learn is to teach.',
    tag: 'Learning',
    date: '2024-11-07'
  },
  {
    id: '5',
    title: 'The Two-Minute Rule',
    content: 'If a task takes less than two minutes, do it immediately. This prevents small tasks from accumulating and overwhelming you. It also builds momentum for tackling larger tasks.',
    tag: 'Productivity',
    date: '2024-11-06'
  },
  {
    id: '6',
    title: 'Embrace Discomfort',
    content: 'Growth happens outside your comfort zone. Deliberately seek situations that challenge you. The discomfort you feel is your brain rewiring itself for new capabilities.',
    quote: 'A ship in harbor is safe, but that is not what ships are built for.',
    tag: 'Growth',
    date: '2024-11-05'
  },
  {
    id: '7',
    title: 'Morning Rituals Matter',
    content: 'How you start your day sets the tone for everything that follows. Create a morning routine that energizes you: exercise, meditation, journaling, or simply enjoying coffee without distractions.',
    tag: 'Habits',
    date: '2024-11-04'
  },
  {
    id: '8',
    title: 'The Power of No',
    content: 'Every yes to something is a no to something else. Be selective with your commitments. Saying no to good opportunities creates space for great ones.',
    quote: 'The difference between successful people and very successful people is that very successful people say no to almost everything.',
    tag: 'Focus',
    date: '2024-11-03'
  },
  {
    id: '9',
    title: 'Reflection Time',
    content: 'Schedule regular time for reflection. Weekly reviews help you course-correct early, celebrate wins, and extract lessons from failures. Progress without reflection is just motion.',
    tag: 'Productivity',
    date: '2024-11-02'
  },
  {
    id: '10',
    title: 'Build a Learning System',
    content: 'Don\'t just consume content. Create a system for capturing, processing, and applying what you learn. Use tools like note-taking apps, spaced repetition, and teaching others.',
    tag: 'Learning',
    date: '2024-11-01'
  },
  {
    id: '11',
    title: 'Energy Management > Time Management',
    content: 'Manage your energy, not just your time. Schedule your most important work during your peak energy hours. Protect your energy through sleep, exercise, nutrition, and boundaries.',
    quote: 'Time is what we want most, but what we use worst.',
    tag: 'Productivity',
    date: '2024-10-31'
  },
  {
    id: '12',
    title: 'The Power of Questions',
    content: 'Ask better questions to get better answers. Instead of "Why me?", ask "What can I learn?". Instead of "What if I fail?", ask "What if I succeed?". Questions direct focus.',
    tag: 'Mindset',
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
          Lessons on growth, productivity, and living intentionally. 
          A collection of insights that have shaped my journey.
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
            {note.quote && (
              <Quote>{note.quote}</Quote>
            )}
          </NoteCard>
        ))}
      </NotesGrid>
    </NotesContainer>
  );
};

export default Snippets;
