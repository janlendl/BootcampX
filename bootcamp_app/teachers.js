const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const input = process.argv.slice(2);

pool
  .query(`
    SELECT teachers.name as name, cohorts.name as cohort
    FROM teachers
    JOIN assistance_requests ON teachers.id = teacher_id
    JOIN students ON student_id = students.id
    JOIN cohorts ON cohort_id = cohorts.id
    WHERE cohorts.name = '${input[0]}'
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name
  `)
  .then(res => {
    res.rows.forEach(teacher => {
      console.log(`${teacher.cohort}: ${teacher.name}`);
    });
  })
  .catch(err => console.log('query error', err.stack));