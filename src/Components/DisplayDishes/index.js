import './index.css'

const DisplayDishes = props => {
  const {each, passDecreseId, passIncreaseId} = props
  const {
    dishId,
    dishAvailability,
    addonCat,
    dishType,
    dishCurrency,
    dishPrice,
    dishCalories,
    dishDescription,
    dishImage,
    dishName,
    quantity,
  } = each

  const decreaseMthod = () => {
    passDecreseId(dishId)
  }

  const increaseMethod = () => {
    passIncreaseId(dishId)
  }

  return (
    <li className="li-dishes" key={dishId}>
      <div className="img-and-description dish-details">
        {dishType === 1 && (
          <div className="box-red">
            <div className="circle-red" />
          </div>
        )}
        {dishType === 2 && (
          <div className="box">
            <div className="circle" />
          </div>
        )}
        {dishType === 3 && (
          <div className="box-black">
            <div className="circle-black" />
          </div>
        )}
        <div>
          <h1 className="h1-dish-nmae">{dishName}</h1>
          <p>
            {dishCurrency} {dishPrice}
          </p>
          <p>{dishDescription}</p>
          {dishAvailability ? (
            <div className="increment-decrement-btns">
              <button className="btns" type="button" onClick={decreaseMthod}>
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button className="btns" type="button" onClick={increaseMethod}>
                +
              </button>
            </div>
          ) : (
            <p className="not-available">Not Available</p>
          )}

          {addonCat.length > 0 && (
            <p className="coust-color">Customizations available</p>
          )}
        </div>
      </div>
      <div className="img-and-description img-calories">
        <p className="calories">{dishCalories} calories</p>
        <img alt={dishName} src={dishImage} />
      </div>
    </li>
  )
}

export default DisplayDishes
