import { useEffect, useRef, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import {
  assistantIntro,
  assistantGreeting,
  suggestedPrompts,
  scriptedReplies,
  fallbackReply,
} from '../data/mockAssistant';
import './AIAssistantPage.css';

/**
 * Picks a scripted reply by keyword match.
 * This is a lookup over fixed strings — there is no model, no API call and no
 * generation of any kind. A real assistant arrives in a much later phase.
 */
function findScriptedReply(message) {
  const text = message.toLowerCase();
  const match = scriptedReplies.find((reply) =>
    reply.keywords.some((keyword) => text.includes(keyword))
  );
  return match ? match.text : fallbackReply;
}

function AIAssistantPage() {
  const [messages, setMessages] = useState([assistantGreeting]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const timerRef = useRef(null);
  const messageIdRef = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function send(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    messageIdRef.current += 1;
    const userMessage = { id: `MSG-U${messageIdRef.current}`, role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setIsTyping(true);

    // Short delay so the interface behaves like a conversation.
    timerRef.current = setTimeout(() => {
      messageIdRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `MSG-A${messageIdRef.current}`,
          role: 'assistant',
          text: findScriptedReply(trimmed),
        },
      ]);
      setIsTyping(false);
    }, 550);
  }

  return (
    <>
      <PageHeader
        eyebrow="AI learning assistant"
        title={assistantIntro.title}
        description={assistantIntro.subtitle}
      />

      <MockNotice>
        Interface preview only. Replies are selected from a small set of pre-written answers.
        No language model, external API or AI service is connected in this build.
      </MockNotice>

      <div className="assistant-layout">
        <Card bodyClass="assistant-card">
          <div className="assistant__log" role="log" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`bubble bubble--${message.role}`}>
                {message.role === 'assistant' && (
                  <span className="bubble__avatar">
                    <Icon name="sparkles" size={14} />
                  </span>
                )}
                <div className="bubble__body">
                  {message.text.split('\n').map((line, index) =>
                    line ? <p key={index}>{line}</p> : <br key={index} />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="bubble bubble--assistant">
                <span className="bubble__avatar">
                  <Icon name="sparkles" size={14} />
                </span>
                <div className="bubble__body bubble__typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="assistant__prompts">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chip"
                onClick={() => send(prompt)}
                disabled={isTyping}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="assistant__composer"
            onSubmit={(event) => {
              event.preventDefault();
              send(draft);
            }}
          >
            <input
              className="input"
              value={draft}
              placeholder="Ask about your skill gaps or what to study next…"
              aria-label="Message the assistant"
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit" className="btn" disabled={!draft.trim() || isTyping}>
              <Icon name="send" size={16} />
              Send
            </button>
          </form>
        </Card>

        <div className="stack">
          <Card title="What this will do" subtitle="Planned capabilities">
            <ul className="capability-list">
              {assistantIntro.capabilities.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} />
                  <span className="small">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="How it will work later" subtitle="Planned request path">
            <ol className="assistant-flow">
              <li>
                <span className="assistant-flow__num">1</span>
                <div>
                  <p className="small strong">React sends your question</p>
                  <p className="tiny muted">To the Node/Express backend only.</p>
                </div>
              </li>
              <li>
                <span className="assistant-flow__num">2</span>
                <div>
                  <p className="small strong">Backend adds your context</p>
                  <p className="tiny muted">
                    Competency, gaps and learning history from the database.
                  </p>
                </div>
              </li>
              <li>
                <span className="assistant-flow__num">3</span>
                <div>
                  <p className="small strong">Python AI service answers</p>
                  <p className="tiny muted">
                    Grounded in uploaded learning material, with API keys kept server-side.
                  </p>
                </div>
              </li>
            </ol>
            <p className="tiny muted" style={{ marginTop: 14 }}>
              None of this is implemented yet. The layout exists so the experience can be
              reviewed before the AI work begins.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AIAssistantPage;
