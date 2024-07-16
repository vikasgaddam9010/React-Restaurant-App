import './index.css'
import {useState, useEffect} from 'react'
import Header from '../Header'
import DisplayDishes from '../DisplayDishes'
import CategoryBtnsList from '../CategoryBtnsList'

const Home = () => {
  const [tableMenuList, setTableMenuList] = useState([])
  const [activeCategory, setActiveCategory] = useState('Salads and Soup')

  const updated = data =>
    data.map(each => ({
      branchName: each.branch_name,
      nextUrl: each.nexturl,
      restaurantId: each.restaurant_id,
      restaurantImage: each.restaurant_image,
      restaurantName: each.restaurant_name,
      tableId: each.table_id,
      tableName: each.table_name,
      tableMenuList: each.table_menu_list.map(eachMenu => ({
        menuCategory: eachMenu.menu_category,
        menuCategoryId: eachMenu.menu_category_id,
        menuCategoryImage: eachMenu.menu_category_image,
        categoryDishes: eachMenu.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          addonCat: eachDish.addonCat,
          quantity: 0,
        })),
      })),
    }))

  const total = tableMenuList.reduce(
    (sum, i) =>
      sum + i.categoryDishes.reduce((dishSum, j) => dishSum + j.quantity, 0),
    0,
  )

  useEffect(() => {
    const getApiResponse = async () => {
      const api =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const apiResponse = await fetch(api)
      const data = await apiResponse.json()
      const result = updated(data)
      setTableMenuList(result[0].tableMenuList)
    }
    getApiResponse()
  }, [])

  const passDecreseId = dishId => {
    const result = tableMenuList.map(eachObject => ({
      ...eachObject,
      categoryDishes: eachObject.categoryDishes.map(each => {
        if (each.dishId === dishId && each.quantity > 0) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      }),
    }))

    setTableMenuList(result)
  }
  const passIncreaseId = dishId => {
    const result = tableMenuList.map(eachObject => ({
      ...eachObject,
      categoryDishes: eachObject.categoryDishes.map(each => {
        if (each.dishId === dishId) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))

    setTableMenuList(result)
  }

  const passACtiveBtn = active => {
    setActiveCategory(active)
  }

  const categoryList = tableMenuList.map(each => ({
    menuCategory: each.menuCategory,
    id: each.menuCategoryId,
  }))

  const renderCategories = () => {
    categoryList.map(each => {
      const onClickToChangeBtn = () => {
        setActiveCategory(each.menuCategory)
      }

      return (
        <li
          className={`${each.menuCategory === activeCategory && 'border'} li`}
          key={each.id}
          onClick={onClickToChangeBtn}
        >
          <button type="button" className="btn">
            {each.menuCategory}
          </button>
        </li>
      )
    })
  }

  return (
    <>
      <Header total={total} />
      <hr />
      <ul className="category-btns-ul-container">{renderCategories()}</ul>
      <CategoryBtnsList
        categoryList={categoryList}
        passACtiveBtn={passACtiveBtn}
        activeCategory={activeCategory}
      />

      <ul className="ul-dishes">
        {tableMenuList
          .filter(each => each.menuCategory === activeCategory)
          .map(each =>
            each.categoryDishes.map(eachItem => (
              <DisplayDishes
                key={eachItem.dishId}
                each={eachItem}
                passDecreseId={passDecreseId}
                passIncreaseId={passIncreaseId}
              />
            )),
          )}
      </ul>
    </>
  )
}

export default Home

/**/
