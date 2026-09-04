import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import EmptyState from '../components/common/EmptyState';
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
    <>
      <PageHeader
        eyebrow="Personalised recommendations"
        title="Your learning path"
        description={recommendationSummary.headline}
        actions={
          <button type="button" className="btn btn-secondary" disabled>
            Refresh recommendations
          </button>
        }
      />

      <MockNotice>
        These recommendations and their explanations are sample data. No recommendation
        algorithm runs in this build — the reasoning shown is fixed text.
      </MockNotice>

      <Card
        title="What this path is based on"
        subtitle={`Last updated ${formatDate(recommendationSummary.generatedOn)}`}
      >
        <ul className="basis-list">
          {recommendationSummary.basedOn.map((item) => (
            <li key={item}>
              <Icon name="layers" size={15} />
              <span className="small">{item}</span>
            </li>
          ))}
        </ul>
        <p className="tiny muted" style={{ marginTop: 14 }}>
          In the completed platform these inputs are sent to the AI/ML service, which returns a
          ranked list with an explanation for each item. The layout on this page already matches
          that response shape.
        </p>
      </Card>

      <div className="skills-filter">
        {priorityFilters.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${filter === item ? 'is-active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item === 'all' ? 'All recommendations' : `${item} priority`}
            <span className="chip__count">
              {item === 'all'
                ? recommendations.length
                : recommendations.filter((rec) => rec.priority === item).length}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            title="Nothing at this priority"
            detail="Select a different priority to see more recommendations."
          />
        </Card>
      ) : (
        <div className="grid grid-2">
          {visible.map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              onStart={() => navigate('/app/learning')}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default RecommendationsPage;
