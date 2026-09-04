import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import MockNotice from '../components/common/MockNotice';
import { learner } from '../data/mockLearner';
import { roles } from '../data/mockSkills';
import { formatDate } from '../utils/format';
import './ProfilePage.css';

const role = roles.find((item) => item.id === learner.roleId);

/** Read-only field row. Editing will be added once the profile API exists. */
function Field({ label, value }) {
  return (
    <div className="profile-field">
      <dt className="tiny muted">{label}</dt>
      <dd className="small strong">{value}</dd>
    </div>
  );
}

function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="My profile"
        title={learner.name}
        description="Your profile drives every competency comparison and recommendation in the platform."
        actions={
          <button type="button" className="btn btn-secondary" disabled>
            Edit profile
          </button>
        }
      />

      <MockNotice>
        Profile values are sample data. The edit action is disabled until the profile API is
        built in a later phase.
      </MockNotice>

      <Card>
        <div className="profile-hero">
          <span className="profile-hero__avatar">{learner.initials}</span>
          <div className="profile-hero__body">
            <div className="row wrap">
              <h2>{learner.name}</h2>
              <Badge tone="brand">{learner.roleTitle}</Badge>
            </div>
            <p className="small muted">
              {learner.designation} · {learner.division}
            </p>
            <div className="profile-hero__meta">
              <span className="tiny muted">
                <Icon name="user" size={13} /> {learner.employeeCode}
              </span>
              <span className="tiny muted">
                <Icon name="clock" size={13} /> {learner.experienceYears} years of experience
              </span>
              <span className="tiny muted">
                <Icon name="layers" size={13} /> Joined {formatDate(learner.joinedOn)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="profile-grid">
        <Card title="Official details" subtitle="Used to determine your role requirements">
          <dl className="profile-fields">
            <Field label="Employee code" value={learner.employeeCode} />
            <Field label="Designation" value={learner.designation} />
            <Field label="Department" value={learner.department} />
            <Field label="Division" value={learner.division} />
            <Field label="Location" value={learner.location} />
            <Field label="Official email" value={learner.email} />
          </dl>
        </Card>

        <Card title="Mapped role" subtitle="Determines the competency benchmark applied to you">
          <h3>{role.title}</h3>
          <p className="small muted" style={{ marginTop: 6 }}>
            {role.description}
          </p>
          <hr className="divider" style={{ margin: '14px 0' }} />
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            Required competency levels
          </p>
          <ul className="profile-requirements">
            {Object.entries(role.requirements).map(([skillId, level]) => (
              <li key={skillId}>
                <span className="small">{skillId.replace('SKL-', '')}</span>
                <span className="small strong mono">{level}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="profile-grid">
        <Card title="Education">
          <ul className="timeline">
            {learner.education.map((item) => (
              <li key={item.id}>
                <div className="timeline__dot" />
                <div>
                  <p className="small strong">{item.qualification}</p>
                  <p className="tiny muted">
                    {item.institution} · {item.year} · {item.score}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Previous training" subtitle="Considered when generating recommendations">
          <ul className="timeline">
            {learner.previousTraining.map((item) => (
              <li key={item.id}>
                <div className="timeline__dot" />
                <div>
                  <p className="small strong">{item.title}</p>
                  <p className="tiny muted">
                    {item.provider} · {item.durationHours} h · {formatDate(item.completedOn)}
                  </p>
                  <Badge tone="met">{item.outcome}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="profile-grid">
        <Card title="Current assignment">
          <p className="small">{learner.currentAssignment}</p>
          <p className="tiny muted" style={{ marginTop: 10 }}>
            Your assignment helps the platform weight which skills matter most day to day.
          </p>
        </Card>

        <Card title="Career goal">
          <div className="row wrap">
            <h3>{learner.careerGoal}</h3>
            <Badge tone="brand">{learner.careerGoalHorizon}</Badge>
          </div>
          <p className="tiny muted" style={{ marginTop: 10 }}>
            Recommendations take this goal into account alongside your current role
            requirements.
          </p>
        </Card>
      </div>
    </>
  );
}

export default ProfilePage;
