import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Icon from '../../components/common/Icon';
import MockNotice from '../../components/common/MockNotice';
import { adminSkillFramework } from '../../data/mockAdmin';
import { roles, skills } from '../../data/mockSkills';
import './admin.css';

function SkillManagementPage() {
  const [activeRoleId, setActiveRoleId] = useState(roles[0].id);
  const activeRole = roles.find((role) => role.id === activeRoleId);

  return (
    <>
      <PageHeader
        eyebrow="Skills and roles"
        title="Competency framework"
        description="The skill catalogue and the competency level each role requires. Skills are referenced by id so the framework can be extended without changing application code."
        actions={
          <button type="button" className="btn" disabled>
            <Icon name="plus" size={16} />
            Add skill
          </button>
        }
      />

      <MockNotice>
        The framework shown here is sample data and read-only. Editing requires the skill and
        role-requirement APIs from a later phase.
      </MockNotice>

      <Card
        title="Skill catalogue"
        subtitle={`${adminSkillFramework.length} skills across 4 categories`}
        bodyClass="card-body--flush"
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Identifier</th>
                <th>Category</th>
                <th>Used by roles</th>
                <th>Learners tracked</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {adminSkillFramework.map((skill) => (
                <tr key={skill.id}>
                  <td className="strong">{skill.name}</td>
                  <td className="tiny mono muted">{skill.id}</td>
                  <td>
                    <Badge tone="neutral">{skill.category}</Badge>
                  </td>
                  <td className="mono">{skill.roles}</td>
                  <td className="mono">{skill.learnersTracked}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="icon-btn" disabled aria-label="Edit skill">
                        <Icon name="edit" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Role requirements"
        subtitle="Each role sets its own target level per skill"
      >
        <div className="skills-filter" style={{ marginBottom: 18 }}>
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`chip ${activeRoleId === role.id ? 'is-active' : ''}`}
              onClick={() => setActiveRoleId(role.id)}
            >
              {role.title}
              <span className="chip__count">{role.learnerCount}</span>
            </button>
          ))}
        </div>

        <p className="small muted" style={{ marginBottom: 16 }}>
          {activeRole.description}
        </p>

        <div className="requirement-grid">
          {skills.map((skill) => {
            const required = activeRole.requirements[skill.id];
            return (
              <div key={skill.id} className="requirement-grid__row">
                <div>
                  <span className="small strong">{skill.name}</span>
                  <span className="tiny muted mono" style={{ display: 'block' }}>
                    {skill.id}
                  </span>
                </div>
                <div className="requirement-grid__levels">
                  <span className="requirement-pill">
                    Target for {activeRole.title}: <strong>{required}</strong>
                  </span>
                  {roles
                    .filter((role) => role.id !== activeRoleId)
                    .map((role) => (
                      <span key={role.id} className="requirement-pill">
                        {role.title}: <strong>{role.requirements[skill.id]}</strong>
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default SkillManagementPage;
