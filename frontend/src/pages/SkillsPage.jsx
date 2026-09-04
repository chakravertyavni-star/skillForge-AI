import { useMemo, useState } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import Reveal from '../components/common/Reveal';
import AnimatedNumber from '../components/common/AnimatedNumber';
import EmptyState from '../components/common/EmptyState';
import ExpandableCard from '../components/common/ExpandableCard';
import SkillJourney from '../components/journey/SkillJourney';
import SkillGapCard from '../components/skills/SkillGapCard';
import { learner } from '../data/mockLearner';
import {
  skillGapAnalysis,
  priorityOrder,
  priorityLabels,
  competencyLevels,
  skills,
  roles,
} from '../data/mockSkills';
import { priorityColor } from '../utils/format';
import './SkillsPage.css';

const role = roles.find((item) => item.id === learner.roleId);
const filters = ['all', ...priorityOrder];
const meaningById = skills.reduce((acc, skill) => {
  acc[skill.id] = skill.meaning;
  return acc;
}, {});

const counts = priorityOrder.reduce((acc, priority) => {
  acc[priority] = skillGapAnalysis.filter((item) => item.priority === priority).length;
  return acc;
}, {});

const largestGap = skillGapAnalysis.reduce((max, item) => (item.gap > max.gap ? item : max));

function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleSkills = useMemo(() => {
    if (activeFilter === 'all') return skillGapAnalysis;
    return skillGapAnalysis.filter((item) => item.priority === activeFilter);
  }, [activeFilter]);

  return (
    <div className="skills-page">
      <Reveal as="header" className="skills-page__head">
        <div>
          <p className="eyebrow">Skills &amp; competency</p>
          <h1>Where you stand</h1>
          <p className="small muted skills-page__lead">
            Measured against the {role.title} role. The distance between your level and the
            target is the gap.
          </p>
        </div>
        <div className="skills-page__stats">
          <span>
            <strong style={{ color: priorityColor('critical') }}>
              <AnimatedNumber value={counts.critical} />
            </strong>
            critical
          </span>
          <span>
            <strong style={{ color: priorityColor('high') }}>
              <AnimatedNumber value={counts.high} />
            </strong>
            high
          </span>
          <span>
            <strong style={{ color: priorityColor('met') }}>
              <AnimatedNumber value={counts.met} />
            </strong>
            met
          </span>
          <span>
            <strong>
              <AnimatedNumber value={largestGap.gap} />
            </strong>
            largest gap
          </span>
        </div>
      </Reveal>

      <Reveal>
        <SkillJourney
          items={skillGapAnalysis}
          title="Competency map"
          subtitle="Select any point to see what that skill means and what to do about it."
        />
      </Reveal>

      <Reveal className="skills-page__filters">
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
      </Reveal>

      {visibleSkills.length === 0 ? (
        <Card>
          <EmptyState
            title="No skills in this category"
            detail="Try selecting a different priority filter."
          />
        </Card>
      ) : (
        <div className="skills-page__grid">
          {visibleSkills.map((item, index) => (
            <Reveal key={item.skillId} delay={Math.min(index, 5) * 45}>
              <SkillGapCard item={item} meaning={meaningById[item.skillId]} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal className="skills-page__grid">
        <ExpandableCard
          title="What the numbers mean"
          meta="Five bands on a single 0–100 scale"
          moreLabel="Show bands"
        >
          <ol className="bands">
            {competencyLevels.map((level) => (
              <li key={level.id}>
                <span className="bands__range mono">{level.range}</span>
                <div>
                  <p className="small strong">{level.label}</p>
                  <p className="tiny muted">{level.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </ExpandableCard>

        <ExpandableCard
          title="Targets in other roles"
          meta="The same skill can matter more elsewhere"
          moreLabel="Compare roles"
          badge={<Badge tone="brand">{role.title}</Badge>}
        >
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>You</th>
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
                      return (
                        <td
                          key={roleItem.id}
                          className={`mono ${isCurrentRole ? 'is-current-role' : ''}`}
                        >
                          {required}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tiny muted">
            <Icon name="info" size={13} /> The highlighted column is your mapped role.
          </p>
        </ExpandableCard>
      </Reveal>
    </div>
  );
}

export default SkillsPage;
