export default {
    getCard() {
        this.$api
            .getCard({})
            .then(res => {
                console.log(res.shopList);
                this.$store.state.length = res.shopList.length
            })
            .catch(err => {
                console.log(err);
            });
    }
}