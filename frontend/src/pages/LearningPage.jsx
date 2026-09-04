import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Icon from '../components/common/Icon';
import SearchInput from '../components/common/SearchInput';
import MockNotice from '../components/common/MockNotice';
import EmptyState from '../components/common/EmptyState';
import ProgressBar from '../components/common/ProgressBar';
import CourseCard from '../components/learning/CourseCard';
import {
  courses as courseSeed,
  courseLevels,
  courseFormats,
  courseStatusLabels,
} from '../data/mockCourses';
import { skills } from '../data/mockSkills';
import '../components/learning/learning.css';

/** Recomputes derived fields after a local progress change. */
function advanceCourse(course) {
  const modulesCompleted = Math.min(course.modules, course.modulesCompleted + 1);
  const progress = Math.round((modulesCompleted / course.modules) * 100);
  let status = 'in-progress';
  if (progress >= 100) status = 'completed';
  else if (progress === 0) status = 'not-started';

  return { ...course, modulesCompleted, progress, status };
}

function LearningPage() {
  // Course progress is held in component state so the "mark module done"
  // interaction works. Nothing is persisted — a page refresh resets it.
  const [courses, setCourses] = useState(courseSeed);
  const [query, setQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openCourse, setOpenCourse] = useState(null);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search) ||
        course.provider.toLowerCase().includes(search) ||
        course.summary.toLowerCase().includes(search) ||
        course.skills.some((skill) => skill.toLowerCase().includes(search));

      const matchesSkill = skillFilter === 'all' || course.skillIds.includes(skillFilter);
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      const matchesFormat = formatFilter === 'all' || course.format === formatFilter;
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;

      return matchesSearch && matchesSkill && matchesLevel && matchesFormat && matchesStatus;
    });
  }, [courses, query, skillFilter, levelFilter, formatFilter, statusFilter]);

  const inProgress = courses.filter((course) => course.status === 'in-progress').length;
  const completed = courses.filter((course) => course.status === 'completed').length;
  const totalHours = courses.reduce((sum, course) => sum + course.durationHours, 0);

  function handleAdvance(courseId) {
    setCourses((prev) =>
      prev.map((course) => (course.id === courseId ? advanceCourse(course) : course))
    );
    setOpenCourse((current) =>
      current && current.id === courseId ? advanceCourse(current) : current
    );
  }

  function resetFilters() {
    setQuery('');
    setSkillFilter('all');
    setLevelFilter('all');
    setFormatFilter('all');
    setStatusFilter('all');
  }

  return (
    <>
      <PageHeader
        eyebrow="Learning resources"
        title="Courses and resources"
        description="Browse the catalogue, filter by the skill you are trying to build, and track your progress through each course."
      />

      <MockNotice>
        The catalogue is sample data. Progress changes are kept in the browser only and reset on
        refresh.
      </MockNotice>

      <div className="grid grid-4">
        <StatCard label="Resources available" value={courses.length} icon="book" />
        <StatCard label="In progress" value={inProgress} icon="clock" tone="accent" />
        <StatCard label="Completed" value={completed} icon="check" tone="met" />
        <StatCard label="Catalogue hours" value={totalHours} unit="h" icon="layers" />
      </div>

      <Card title="Find a resource">
        <div className="filter-bar">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by title, provider or skill…"
            label="Search learning resources"
          />

          <div className="field">
            <label htmlFor="skill-filter">Skill</label>
            <select
              id="skill-filter"
              className="select"
              value={skillFilter}
              onChange={(event) => setSkillFilter(event.target.value)}
            >
              <option value="all">All skills</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="level-filter">Level</label>
            <select
              id="level-filter"
              className="select"
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
            >
              <option value="all">All levels</option>
              {courseLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="format-filter">Format</label>
            <select
              id="format-filter"
              className="select"
              value={formatFilter}
              onChange={(event) => setFormatFilter(event.target.value)}
            >
              <option value="all">All formats</option>
              {courseFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              className="select"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">Any status</option>
              {Object.entries(courseStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="btn btn-secondary" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <p className="tiny muted" style={{ marginTop: 12 }}>
          Showing {visible.length} of {courses.length} resources.
        </p>
      </Card>

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            title="No resources match your filters"
            detail="Try clearing the search box or resetting the filters."
            icon="search"
          />
        </Card>
      ) : (
        <div className="grid grid-3">
          {visible.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onOpen={setOpenCourse}
              onAdvance={handleAdvance}
            />
          ))}
        </div>
      )}

      {openCourse && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={openCourse.title}>
          <button
            type="button"
            className="drawer__scrim"
            aria-label="Close resource"
            onClick={() => setOpenCourse(null)}
          />
          <div className="drawer__panel">
            <div className="row-between">
              <Badge tone="brand">{openCourse.format}</Badge>
              <button
                type="button"
                className="icon-btn"
                aria-label="Close"
                onClick={() => setOpenCourse(null)}
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div>
              <h2>{openCourse.title}</h2>
              <p className="small muted" style={{ marginTop: 4 }}>
                {openCourse.provider}
              </p>
            </div>

            <p className="small">{openCourse.summary}</p>

            <div className="grid grid-2">
              <div>
                <p className="tiny muted">Level</p>
                <p className="small strong">{openCourse.level}</p>
              </div>
              <div>
                <p className="tiny muted">Duration</p>
                <p className="small strong">{openCourse.durationHours} hours</p>
              </div>
              <div>
                <p className="tiny muted">Rating</p>
                <p className="small strong">★ {openCourse.rating}</p>
              </div>
              <div>
                <p className="tiny muted">Enrolled</p>
                <p className="small strong">{openCourse.enrolledCount.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                Skills covered
              </p>
              <div className="row wrap">
                {openCourse.skills.map((skill) => (
                  <span key={skill} className="badge badge-brand">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <ProgressBar
                value={openCourse.progress}
                label="Your progress"
                valueLabel={`${openCourse.progress}%`}
              />
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                Modules
              </p>
              <ul className="drawer__modules">
                {Array.from({ length: openCourse.modules }, (_, index) => {
                  const done = index < openCourse.modulesCompleted;
                  return (
                    <li key={index} className={done ? 'is-done' : ''}>
                      <Icon name={done ? 'check' : 'book'} size={15} />
                      Module {index + 1}
                      {done && <span className="tiny" style={{ marginLeft: 'auto' }}>Done</span>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              className="btn"
              disabled={openCourse.progress >= 100}
              onClick={() => handleAdvance(openCourse.id)}
            >
              {openCourse.progress >= 100 ? 'Course completed' : 'Mark next module complete'}
            </button>

            <p className="tiny muted">
              Course content is not part of this build. Enrolment and progress will be stored by
              the backend in a later phase.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LearningPage;
