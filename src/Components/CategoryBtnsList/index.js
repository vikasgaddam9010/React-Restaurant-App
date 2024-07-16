import './index.css'

const CategoryBtnsList = props => {
  const {categoryList, activeCategory, passACtiveBtn} = props

  return (
    <ul className="category-btns-ul-container">
      {categoryList.map(eachCategory => {
        const onClickToChangeBtn = () => {
          passACtiveBtn(eachCategory.menuCategory)
        }

        return (
          <li
            className={`${
              eachCategory.menuCategory === activeCategory && 'border'
            } li`}
            key={eachCategory.id}
            onClick={onClickToChangeBtn}
          >
            <button type="button" className="btn">
              {eachCategory.menuCategory}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryBtnsList
/*
 */
