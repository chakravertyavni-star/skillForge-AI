import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import EmptyState from '../components/common/EmptyState';
import ExpandableCard from '../components/common/ExpandableCard';
import RecommendationCard from '../components/recommendations/RecommendationCard';
import { recommendations, recommendationSummary } from '../data/mockRecommendations';
import { formatDate } from '../utils/format';
import './RecommendationsPage.css';

const priorityFilters = ['all', 'critical', 'high', 'moderate', 'low'];

function RecommendationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const visible = useMemo(() => {
    if (filter === 'all') return recommendations;
    return recommendations.filter((item) => item.priority === filter);
  }, [filter]);

  return (
    <div className="recs">
      <Reveal as="header" className="recs__head">
        <div>
          <p className="eyebrow">Your learning path</p>
          <h1>What to learn next</h1>
          <p className="small muted recs__lead">{recommendationSummary.headline}</p>
        </div>
        <span className="recs__stamp tiny muted">
          <Icon name="clock" size={13} /> Updated {formatDate(recommendationSummary.generatedOn)}
        </span>
      </Reveal>

      <Reveal className="skills-filter">
        {priorityFilters.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${filter === item ? 'is-active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item === 'all' ? 'All' : item}
            <span className="chip__count">
              {item === 'all'
                ? recommendations.length
                : recommendations.filter((rec) => rec.priority === item).length}
            </span>
          </button>
        ))}
      </Reveal>

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            title="Nothing at this priority"
            detail="Select a different priority to see more recommendations."
          />
        </Card>
      ) : (
        <div className="recs__grid">
          {visible.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index, 5) * 45}>
              <RecommendationCard item={item} onStart={() => navigate('/app/learning')} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <ExpandableCard
          title="How this path was built"
          meta="Five inputs feed the ranking"
          moreLabel="Show inputs"
        >
          <ul className="basis-list">
            {recommendationSummary.basedOn.map((item) => (
              <li key={item}>
                <Icon name="layers" size={15} />
                <span className="small">{item}</span>
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            The reasoning shown on each card is sample text. No recommendation algorithm runs in
            this build.
          </p>
        </ExpandableCard>
      </Reveal>
    </div>
  );
}

export default RecommendationsPage;
