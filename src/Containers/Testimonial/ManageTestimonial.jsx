import React from 'react'
import styles from "./ManageTestimonial.module.css"
import {Button} from '@mui/material'

const ManageTestimonial = () => {
  return (
    <div className={styles.manage_testimonial_container}>
      <h2>Manage testimonials</h2>
      <div className={styles.manage_testimonials_filter}>
        <p>Select Project : </p>
        <select name="" id="">
          <option value="">ABC</option>
          <option value="">ABC</option>
          <option value="">ABC</option>
          <option value="">ABC</option>
        </select>
      </div>
    <div className={styles.manage_testimonials}>
      <div className={styles.testimonial_card}>
        <div className={styles.testimonial_head}>
          <div className={styles.testimonial_img}>
            <img src="" alt="" />
          </div>
          <div>
            <h4>Rituraj Pathak</h4>
            <p>Guwahati</p>
          </div>
        </div>
        <div className={styles.testimonial_body}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis unde minus facere vero voluptas, iste saepe similique voluptatem eaque reiciendis incidunt quos reprehenderit? Adipisci.</p>
          <div className={styles.testimonial_btn}>
          <Button variant="contained">Delete</Button>
          </div>
        </div>
      </div>
      <div className={styles.testimonial_card}>
        <div className={styles.testimonial_head}>
          <div className={styles.testimonial_img}>
            <img src="" alt="" />
          </div>
          <div>
            <h4>Rituraj Pathak</h4>
            <p>Guwahati</p>
          </div>
        </div>
        <div className={styles.testimonial_body}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis unde minus facere vero voluptas, iste saepe similique voluptatem eaque reiciendis incidunt quos reprehenderit? Adipisci.</p>
          <div className={styles.testimonial_btn}>
          <Button variant="contained">Edit</Button>
          </div>
        </div>
      </div>
      <div className={styles.testimonial_card}>
        <div className={styles.testimonial_head}>
          <div className={styles.testimonial_img}>
            <img src="" alt="" />
          </div>
          <div>
            <h4>Rituraj Pathak</h4>
            <p>Guwahati</p>
          </div>
        </div>
        <div className={styles.testimonial_body}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis unde minus facere vero voluptas, iste saepe similique voluptatem eaque reiciendis incidunt quos reprehenderit? Adipisci.</p>
          <div className={styles.testimonial_btn}>
          <Button variant="contained">Edit</Button>
          </div>
        </div>
      </div>
      <div className={styles.testimonial_card}>
        <div className={styles.testimonial_head}>
          <div className={styles.testimonial_img}>
            <img src="" alt="" />
          </div>
          <div>
            <h4>Rituraj Pathak</h4>
            <p>Guwahati</p>
          </div>
        </div>
        <div className={styles.testimonial_body}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, debitis unde minus facere vero voluptas, iste saepe similique voluptatem eaque reiciendis incidunt quos reprehenderit? Adipisci.</p>
          <div className={styles.testimonial_btn}>
          <Button variant="contained">Delete</Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ManageTestimonial