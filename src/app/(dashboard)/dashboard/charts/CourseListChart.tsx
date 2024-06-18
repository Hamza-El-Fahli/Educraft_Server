import React, { useState, useEffect } from 'react';
import './CourseList.css';

const CourseList = () => {
    type LastCourse = {title:string,category:string,added:string}
  const [courses, setCourses] = useState<LastCourse[]>([]);
  const [visibleCourses, setVisibleCourses] = useState<LastCourse[]>([]);

  useEffect(() => {
    // Simulate fetching course data
    const fetchedCourses:LastCourse[] = [
      { title: 'History on Networking', category: 'CCNA1', added: '3 days ago' },
      { title: 'Security IOT', category: 'CCNA4', added: '5 days ago' },
      { title: 'Open Source System', category: 'CCNA3', added: '5 days ago' },
      { title: 'Python in AI', category: 'Programming', added: '1 week ago' },
    ];
    setCourses(fetchedCourses);
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      courses.forEach((course, index) => {
        setTimeout(() => {
          setVisibleCourses((prev:LastCourse[]) => [...prev, course]);
        }, index * 200); // Delay each course appearance by 0.5 seconds
      });
    }
  }, [courses]);

  return (
    <div className="course-list-container">
      <div className="course-list">
         {courses.length != 0 && <div> Recent added courses</div>}
        {visibleCourses.map((course, index) => (
          <div className={` course-item ${visibleCourses.length > index ? 'visible' : ''}`} key={index}>
            <div className="course-title">{course.title}</div>
            <div className="course-category">{course.category}</div>
            <div className="course-added">{course.added}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
