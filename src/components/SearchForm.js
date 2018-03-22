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
      search1: formData.get('search1'),
      search2: formData.get('search2')
    });
  }

  return (
    <form
      className="SearchForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="search2">Search by location</label> <br />
        <input name="search2" id="search2" />
      </div>

      <div>
        <label htmlFor="search1">Search by specific Item</label> <br />
        <input name="search1" id="search1" cols="60" rows="4" />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

export default SearchForm;
