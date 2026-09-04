import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import MockNotice from '../components/common/MockNotice';
import EmptyState from '../components/common/EmptyState';
import SkillGapCard from '../components/skills/SkillGapCard';
import ComparisonBar from '../components/charts/ComparisonBar';
import { learner } from '../data/mockLearner';
import { skillGapAnalysis, priorityOrder, priorityLabels, roles } from '../data/mockSkills';
import { priorityColor } from '../utils/format';
import './SkillsPage.css';

const role = roles.find((item) => item.id === learner.roleId);
const filters = ['all', ...priorityOrder];

function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleSkills = useMemo(() => {
    if (activeFilter === 'all') return skillGapAnalysis;
    return skillGapAnalysis.filter((item) => item.priority === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    return priorityOrder.reduce((acc, priority) => {
      acc[priority] = skillGapAnalysis.filter((item) => item.priority === priority).length;
      return acc;
    }, {});
  }, []);

  const gapCount = skillGapAnalysis.filter((item) => item.gap > 0).length;
  const largestGap = skillGapAnalysis.reduce((max, item) => (item.gap > max.gap ? item : max));

  return (
    <>
      <PageHeader
        eyebrow="Skills & competency"
        title="Competency framework"
        description={`Your current level for each skill compared with the target defined for the ${role.title} role. A gap is the distance between the two.`}
      />

      <MockNotice>
        All competency values, gaps and explanations shown here are sample data. Competency
        scoring will be produced by the AI/ML service in a later phase.
      </MockNotice>

      <div className="grid grid-4">
        <StatCard
          label="Skills tracked"
          value={skillGapAnalysis.length}
          hint="in your role framework"
          icon="layers"
        />
        <StatCard
          label="Below target"
          value={gapCount}
          hint="skills with a gap"
          icon="alert"
          tone="critical"
        />
        <StatCard
          label="Meeting target"
          value={counts.met}
          hint="at or above requirement"
          icon="check"
          tone="met"
        />
        <StatCard
          label="Largest gap"
          value={largestGap.gap}
          hint={largestGap.skill}
          icon="target"
          tone="accent"
        />
      </div>

      <Card
        title="How to read this page"
        subtitle="Every skill is scored on the same 0–100 scale"
      >
        <div className="legend">
          <div className="legend__example">
            <ComparisonBar current={45} required={80} color={priorityColor('high')} height={10} />
            <div className="legend__labels tiny muted">
              <span>Filled bar = your current level</span>
              <span>Marker = level required for your role</span>
            </div>
          </div>
          <ul className="legend__key">
            {priorityOrder.map((priority) => (
              <li key={priority}>
                <span
                  className="legend__swatch"
                  style={{ background: priorityColor(priority) }}
                />
                <span className="small">
                  <strong>{priorityLabels[priority]}</strong>
                  <span className="tiny muted"> · {counts[priority]} skills</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="skills-filter">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chip ${activeFilter === filter ? 'is-active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'all' ? 'All skills' : priorityLabels[filter]}
            <span className="chip__count">
              {filter === 'all' ? skillGapAnalysis.length : counts[filter]}
            </span>
          </button>
        ))}
      </div>

      {visibleSkills.length === 0 ? (
        <Card>
          <EmptyState
            title="No skills in this category"
            detail="Try selecting a different priority filter."
          />
        </Card>
      ) : (
        <div className="grid grid-2">
          {visibleSkills.map((item) => (
            <SkillGapCard key={item.skillId} item={item} />
          ))}
        </div>
      )}

      <Card
        title="Role requirement comparison"
        subtitle="The same skill can carry a different target in another role"
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Your level</th>
                {roles.map((item) => (
                  <th key={item.id}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillGapAnalysis.map((item) => (
                <tr key={item.skillId}>
                  <td className="strong">{item.skill}</td>
                  <td className="mono">{item.currentScore}</td>
                  {roles.map((roleItem) => {
                    const required = roleItem.requirements[item.skillId];
                    const isCurrentRole = roleItem.id === learner.roleId;
                    const below = item.currentScore < required;
                    return (
                      <td
                        key={roleItem.id}
                        className={`mono ${isCurrentRole ? 'is-current-role' : ''}`}
                      >
                        {required}
                        {isCurrentRole && below && (
                          <span className="tiny" style={{ color: 'var(--critical)' }}>
                            {' '}
                            (−{required - item.currentScore})
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tiny muted" style={{ marginTop: 12 }}>
          Highlighted column is your currently mapped role.
        </p>
      </Card>
    </>
  );
}

export default SkillsPage;
