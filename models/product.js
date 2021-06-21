class Product {
    constructor(id, ownerId, categoryIds, title, imageUrl1, imageUrl2, imageUrl3, imageUrl4, price, oldPrice, description, rating, overview) {
        this.id = id
        this.ownerId = ownerId
        this.categoryIds = categoryIds
        this.title = title
        this.imageUrl1 = imageUrl1
        this.imageUrl2 = imageUrl2
        this.imageUrl3 = imageUrl3
        this.imageUrl4 = imageUrl4
        this.price = price
        this.oldPrice = oldPrice
        this.description = description
        this.rating = rating
        this.overview = overview
    }
}

export default Product;