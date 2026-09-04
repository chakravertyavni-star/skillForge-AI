import Badge from '../common/Badge';
import Icon from '../common/Icon';
import ProgressBar from '../common/ProgressBar';
import { courseStatusLabels } from '../../data/mockCourses';
import './learning.css';

const statusTone = {
  completed: 'met',
  'in-progress': 'brand',
  'not-started': 'neutral',
};

/** Course tile with local-only progress interaction. */
function CourseCard({ course, onOpen, onAdvance }) {
  return (
    <article className="course-card">
      <header>
        <div className="row wrap" style={{ marginBottom: 8 }}>
          <Badge tone={statusTone[course.status]}>{courseStatusLabels[course.status]}</Badge>
          <span className="badge badge-neutral">{course.level}</span>
          <span className="badge badge-neutral">{course.format}</span>
        </div>
        <h3>{course.title}</h3>
        <p className="tiny muted">{course.provider}</p>
      </header>

      <p className="small course-card__summary">{course.summary}</p>

      <ul className="course-card__skills">
        {course.skills.map((skill) => (
          <li key={skill} className="badge badge-brand">
            {skill}
          </li>
        ))}
      </ul>

      <ProgressBar
        value={course.progress}
        label={`${course.modulesCompleted} of ${course.modules} modules`}
        valueLabel={`${course.progress}%`}
        height={6}
      />

      <footer className="course-card__foot">
        <span className="tiny muted">
          <Icon name="clock" size={13} /> {course.durationHours} h · ★ {course.rating}
        </span>
        <div className="row">
          <button type="button" className="btn btn-sm btn-secondary" onClick={() => onOpen(course)}>
            Open
          </button>
          <button
            type="button"
            className="btn btn-sm"
            disabled={course.progress >= 100}
            onClick={() => onAdvance(course.id)}
          >
            {course.progress >= 100 ? 'Completed' : 'Mark module done'}
          </button>
        </div>
      </footer>
    </article>
  );
}

export default CourseCard;
