export const dashboardRoles = ['teacher', 'student']

export const dashboardData = {
  teacher: {
    title: 'Teacher dashboard',
    metrics: [
      {
        title: 'Teaching hours',
        value: (progress) => (24.5 * progress).toFixed(1),
        color: 'indigo',
      },
      {
        title: 'Earnings',
        value: (progress) => `₹${Math.round(8400 * progress).toLocaleString('en-IN')}`,
        color: 'emerald',
      },
    ],
    progressTitle: 'Student progress',
    progressItems: [
      { name: 'Python fundamentals', progress: 72 },
      { name: 'Conditional logic', progress: 85 },
      { name: 'Loops and iteration', progress: 48 },
    ],
    detailTitle: 'Class management',
    details: [
      { label: 'Python fundamentals', value: '10:00 AM' },
      { label: 'Algebra practice', value: '1:30 PM' },
    ],
  },
  student: {
    title: 'Student dashboard',
    metrics: [
      {
        title: 'Subjects',
        value: (progress) => `${Math.round(5 * progress)} subjects`,
        color: 'indigo',
      },
      {
        title: 'Attendance',
        value: (progress) => `${Math.round(8 * progress)} / 10 sessions`,
        color: 'emerald',
      },
    ],
    progressTitle: 'Learning progress',
    progressItems: [
      { name: 'Mathematics', progress: 72 },
      { name: 'Science', progress: 85 },
      { name: 'English', progress: 64 },
    ],
    detailTitle: 'Homework',
    details: [
      { label: 'Math practice', value: '3 tasks' },
      { label: 'Reading response', value: '1 task' },
    ],
  },
}
