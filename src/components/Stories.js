import React from 'react'
import { FaReadme, FaTrashAlt } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'

const Stories = () => {
const { news, removeStory, loading } = useGlobalContext();

if (loading) {
  return (
    <div className="loading"></div>
  )
}

return (
    <section className="stories">
    {news.map(news => {
    const {title, url, author, points, num_comments, objectID } = news;
    return (
      <article key={objectID} className="story">
        <h4 className="title">{title}</h4>
        <p className='info'>{points} by {author} | {num_comments}</p>
        <div className='icons-container'>
        <a href={url} className="read-link" target='_blank' rel='noopener noreferrer'>
        <FaReadme size={18}/>
        </a>
        <button className="remove-btn" onClick={() => removeStory(objectID)}>
        <FaTrashAlt size={16} />
        </button>
        </div>
      </article>
    )})}
    </section>
  )
}

export default Stories
