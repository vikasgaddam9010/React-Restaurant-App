import './index.css'

const CategoryBtnsList = props => {
  const {categoryList, activeCategory, passACtiveBtn} = props

  return (
    <>
      <ul className="category-btns-ul-container">
        {categoryList.map(each => {
          const onClickToChangeBtn = () => {
            passACtiveBtn(each.menuCategory)
          }

          return (
            <li
              className={`${
                each.menuCategory === activeCategory ? 'border' : null
              } li`}
              key={each.id}
              onClick={onClickToChangeBtn}
            >
              <button type="button" className="btn">
                {each.menuCategory}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default CategoryBtnsList
