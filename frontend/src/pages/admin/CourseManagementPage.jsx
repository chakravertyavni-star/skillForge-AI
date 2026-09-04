import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Icon from '../../components/common/Icon';
import MockNotice from '../../components/common/MockNotice';
import { adminCourses, adminLearningMaterial } from '../../data/mockAdmin';
import { formatDate } from '../../utils/format';
import './admin.css';

function CourseManagementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Courses and material"
        title="Learning catalogue"
        description="Published courses and the learning material attached to them."
        actions={
          <button type="button" className="btn" disabled>
            <Icon name="plus" size={16} />
            Add course
          </button>
        }
      />

      <MockNotice>
        Sample catalogue. Course creation, file upload, text extraction and AI quiz generation
        all belong to later phases — the controls below are intentionally inactive.
      </MockNotice>

      <Card
        title="Courses"
        subtitle={`${adminCourses.length} entries`}
        bodyClass="card-body--flush"
      >
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Primary skill</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Enrolled</th>
                <th>Status</th>
                <th>Updated</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {adminCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <span className="small strong">{course.title}</span>
                    <span className="tiny mono muted" style={{ display: 'block' }}>
                      {course.id}
                    </span>
                  </td>
                  <td>
                    <Badge tone="brand">{course.skill}</Badge>
                  </td>
                  <td className="tiny muted">{course.level}</td>
                  <td className="mono">{course.durationHours} h</td>
                  <td className="mono">{course.enrolled.toLocaleString('en-IN')}</td>
                  <td>
                    <Badge tone={course.status === 'published' ? 'met' : 'neutral'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="tiny muted">{formatDate(course.updatedOn)}</td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="icon-btn" disabled aria-label="Edit course">
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
        title="Learning material"
        subtitle="Documents attached to courses"
        action={
          <button type="button" className="btn btn-sm" disabled>
            <Icon name="upload" size={15} />
            Upload PDF
          </button>
        }
      >
        <div className="upload-zone">
          <Icon name="upload" size={22} />
          <p className="small strong">Upload is not available in this phase</p>
          <p className="tiny">
            Document upload, text extraction and source-grounded question generation are part of
            the AI/NLP phases.
          </p>
        </div>

        <div className="stack" style={{ marginTop: 18, gap: 10 }}>
          {adminLearningMaterial.map((material) => (
            <div key={material.id} className="material-row">
              <span className="material-row__icon">
                <Icon name="book" size={17} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="small strong">{material.fileName}</p>
                <p className="tiny muted">
                  {material.course} · {material.pages} pages · uploaded{' '}
                  {formatDate(material.uploadedOn)}
                </p>
              </div>
              <Badge tone="neutral">Not processed</Badge>
              <button type="button" className="btn btn-sm btn-secondary" disabled>
                Generate quiz
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

export default CourseManagementPage;
