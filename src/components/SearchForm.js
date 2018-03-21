import React from 'react'

function SearchForm (props) {
  // props.onSubmit
  const {onSubmit = () => {}} = props

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // See key => values from formData object
    // console.log(
    //   Array.from(formData.entries())
    // )
    onSubmit({
      contact: formData.get('contact'),
      body: formData.get('body')
    });
  }

  return (
    <form
      className="SearchForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="body">Your Search</label> <br />
        <input name="body" id="body" />
      </div>

      <div>
        <label htmlFor="contact">Contact</label> <br />
        <textarea name="contact" id="contact" cols="60" rows="4" />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

export default SearchForm;
