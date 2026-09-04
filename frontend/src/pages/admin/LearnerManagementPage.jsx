import { useMemo, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Icon from '../../components/common/Icon';
import SearchInput from '../../components/common/SearchInput';
import MockNotice from '../../components/common/MockNotice';
import EmptyState from '../../components/common/EmptyState';
import ProgressBar from '../../components/common/ProgressBar';
import { adminLearners, departmentGapSummary } from '../../data/mockAdmin';
import { roles } from '../../data/mockSkills';
import { formatDate } from '../../utils/format';
import './admin.css';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

function competencyTone(value) {
  if (value >= 75) return 'met';
  if (value >= 60) return 'moderate';
  return 'critical';
}

function LearnerManagementPage() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return adminLearners.filter((learner) => {
      const matchesSearch =
        !search ||
        learner.name.toLowerCase().includes(search) ||
        learner.id.toLowerCase().includes(search) ||
        learner.designation.toLowerCase().includes(search);
      const matchesRole = roleFilter === 'all' || learner.role === roleFilter;
      const matchesDept = deptFilter === 'all' || learner.department === deptFilter;
      return matchesSearch && matchesRole && matchesDept;
    });
  }, [query, roleFilter, deptFilter]);

  return (
    <>
      <PageHeader
        eyebrow="Learner management"
        title="Learners"
        description="Learner records, mapped roles and current competency across the organisation."
        actions={
          <button type="button" className="btn" disabled>
            <Icon name="plus" size={16} />
            Add learner
          </button>
        }
      />

      <MockNotice>
        This table is sample data. Creating, editing and deleting learners needs the backend and
        database, which are later phases.
      </MockNotice>

      <Card title="Filter learners">
        <div className="admin-toolbar">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, ID or designation…"
            label="Search learners"
          />

          <div className="field">
            <label htmlFor="role-filter">Role</label>
            <select
              id="role-filter"
              className="select"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              <option value="all">All roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.title}>
                  {role.title}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="dept-filter">Department</label>
            <select
              id="dept-filter"
              className="select"
              value={deptFilter}
              onChange={(event) => setDeptFilter(event.target.value)}
            >
              <option value="all">All departments</option>
              {departmentGapSummary.map((dept) => (
                <option key={dept.department} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="tiny muted" style={{ marginTop: 12 }}>
          Showing {visible.length} of {adminLearners.length} learners.
        </p>
      </Card>

      <Card bodyClass="card-body--flush">
        {visible.length === 0 ? (
          <EmptyState
            title="No learners match your filters"
            detail="Try a different search term or clear the filters."
            icon="search"
          />
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Learner</th>
                  <th>Department</th>
                  <th>Mapped role</th>
                  <th>Competency</th>
                  <th>Critical gaps</th>
                  <th>Last active</th>
                  <th>Status</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {visible.map((learner) => (
                  <tr key={learner.id}>
                    <td>
                      <div className="avatar-cell">
                        <span className="avatar-cell__initials">{initials(learner.name)}</span>
                        <div>
                          <span className="small strong">{learner.name}</span>
                          <span className="tiny muted" style={{ display: 'block' }}>
                            {learner.id} · {learner.designation}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="tiny muted">{learner.department}</td>
                    <td>
                      <Badge tone="brand">{learner.role}</Badge>
                    </td>
                    <td>
                      <div className="competency-cell">
                        <span className="tiny strong">{learner.competency}%</span>
                        <ProgressBar value={learner.competency} height={5} />
                      </div>
                    </td>
                    <td>
                      {learner.criticalGaps > 0 ? (
                        <Badge tone={competencyTone(learner.competency)}>
                          {learner.criticalGaps}
                        </Badge>
                      ) : (
                        <Badge tone="met">None</Badge>
                      )}
                    </td>
                    <td className="tiny muted">{formatDate(learner.lastActive)}</td>
                    <td>
                      <Badge tone={learner.status === 'active' ? 'met' : 'neutral'}>
                        {learner.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="icon-btn" disabled aria-label="Edit">
                          <Icon name="edit" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

export default LearnerManagementPage;
