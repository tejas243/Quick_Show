import React, { useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Title from '../../components/admin/Title'

const AddShows = () => {
  const [search, setSearch] = useState('')
  const [selectedMovies, setSelectedMovies] = useState([])
  const [showPrice, setShowPrice] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [dateTimes, setDateTimes] = useState([])
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Filter movies by search
  const filteredMovies = dummyShowsData.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  // Toggle movie selection
  const handleMovieSelect = (movie) => {
    if (selectedMovies.some(m => m._id === movie._id)) {
      setSelectedMovies(selectedMovies.filter(m => m._id !== movie._id))
    } else {
      setSelectedMovies([...selectedMovies, movie])
    }
  }

  // Add date-time
  const handleAddDateTime = () => {
    if (date && time) {
      setDateTimes([...dateTimes, { date, time }])
      setDate('')
      setTime('')
    }
  }

  // Remove date-time
  const handleRemoveDateTime = (idx) => {
    setDateTimes(dateTimes.filter((_, i) => i !== idx))
  }

  // Validation
  const validate = () => {
    const newErrors = {}
    if (selectedMovies.length === 0) newErrors.movies = 'Select at least one movie.'
    if (!showPrice) newErrors.price = 'Enter a show price.'
    if (dateTimes.length === 0) newErrors.dateTimes = 'Add at least one date and time.'
    return newErrors
  }

  // Handle submit
  const handleSubmit = () => {
    setSubmitted(true)
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      alert('Show(s) added successfully!')
      // Reset form
      setSelectedMovies([])
      setShowPrice('')
      setDate('')
      setTime('')
      setDateTimes([])
      setErrors({})
      setSubmitted(false)
    }
  }

  return (
    <div className="w-full">
      <Title text1="Add" text2="Shows" />
      <div className="mt-6">
        <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            className="w-full md:w-96 p-2 rounded bg-[#2a2235] border border-primary/20 text-white shadow focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <p className="text-lg font-medium mb-2 text-white">Now Playing Movies</p>
        <div className="flex flex-wrap gap-6 mb-8">
          {filteredMovies.length === 0 && (
            <p className="text-gray-400">No movies found.</p>
          )}
          {filteredMovies.map((movie) => {
            const selected = selectedMovies.some(m => m._id === movie._id)
            return (
              <div
                key={movie._id}
                className={`relative w-48 rounded-lg overflow-hidden bg-primary/10 border border-primary/20 shadow-lg hover:shadow-pink-400/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${selected ? 'ring-2 ring-pink-500 scale-105' : ''}`}
                onClick={() => handleMovieSelect(movie)}
                tabIndex={0}
                aria-label={`Select movie ${movie.title}`}
              >
                <img src={movie.poster_path} alt={movie.title} className="h-64 w-full object-cover group-hover:opacity-90 transition" />
                {selected && (
                  <span className="absolute top-2 right-2 bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold animate-bounce">✓</span>
                )}
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-400 text-sm font-semibold">★ {(movie.vote_average).toFixed(1)}/5</span>
                    <span className="text-gray-400 text-xs">{(movie.vote_count / 1000).toFixed(2)}k Votes</span>
                  </div>
                  <p className="font-medium truncate text-white">{movie.title}</p>
                  <p className="text-xs text-gray-400 truncate">{movie.genres.map(g => g.name).join(', ')}</p>
                </div>
              </div>
            )
          })}
        </div>
        {selectedMovies.length > 0 && (
          <div className="mb-6 p-4 rounded bg-primary/10 border border-primary/20 shadow flex flex-wrap gap-3 items-center">
            <span className="text-white font-semibold mr-2">Selected:</span>
            {selectedMovies.map(movie => (
              <span key={movie._id} className="flex items-center gap-1 bg-pink-500/80 text-white px-3 py-1 rounded-full text-sm shadow">
                {movie.title}
                <button
                  type="button"
                  className="ml-1 text-white hover:text-pink-200 font-bold"
                  onClick={() => setSelectedMovies(selectedMovies.filter(m => m._id !== movie._id))}
                  aria-label={`Remove ${movie.title}`}
                >×</button>
              </span>
            ))}
          </div>
        )}
        <div className="max-w-md">
          <label className="block text-white mb-1" title="Set the ticket price for the show">Show Price <span className="text-pink-400" title="Required">*</span></label>
          <input
            type="number"
            className={`w-full p-2 rounded bg-[#2a2235] border border-primary/20 text-white mb-1 shadow focus:ring-2 focus:ring-pink-400 transition ${errors.price && submitted ? 'border-pink-500' : ''}`}
            placeholder="$ Enter show price"
            value={showPrice}
            onChange={e => setShowPrice(e.target.value)}
            min={1}
          />
          {errors.price && submitted && <div className="text-pink-400 text-xs animate-fade-in mb-2">{errors.price}</div>}

          <label className="block text-white mb-1 mt-2" title="Pick a date and time for the show">Select Date and Time <span className="text-pink-400" title="Required">*</span></label>
          <div className="flex gap-2 mb-2">
            <input
              type="date"
              className="p-2 rounded bg-[#2a2235] border border-primary/20 text-white shadow"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <input
              type="time"
              className="p-2 rounded bg-[#2a2235] border border-primary/20 text-white shadow"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
            <button
              type="button"
              className="bg-pink-500 text-white px-3 rounded hover:bg-pink-600 transition shadow"
              onClick={handleAddDateTime}
              title="Add this date and time"
            >
              Add Time
            </button>
          </div>
          {errors.dateTimes && submitted && <div className="text-pink-400 text-xs animate-fade-in mb-2">{errors.dateTimes}</div>}
          <div className="mb-4">
            <label className="block text-white mb-1">Selected Date-Time</label>
            <div className="flex flex-wrap gap-2">
              {dateTimes.map((dt, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-[#2a2235] text-white px-2 py-1 rounded shadow">
                  <span>{dt.date}</span>
                  <span>{dt.time}</span>
                  <button
                    type="button"
                    className="ml-1 text-pink-400 hover:text-pink-600 font-bold"
                    onClick={() => handleRemoveDateTime(idx)}
                    aria-label="Remove date-time"
                  >×</button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className={`bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600 transition mt-2 shadow-lg ${Object.keys(validate()).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={Object.keys(validate()).length > 0}
            title="Add the show(s) with the selected details"
          >
            Add Show
          </button>
          {errors.movies && submitted && <div className="text-pink-400 text-xs animate-fade-in mt-2">{errors.movies}</div>}
        </div>
      </div>
    </div>
  )
}

export default AddShows
