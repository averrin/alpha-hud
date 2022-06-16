<script>
    export let token;

    function getTotalGP(data) {
		const currency = foundry.utils.deepClone(data.currency);
		const convert = CONFIG.DND5E.currencies;
		for (let [curr, currData] of Object.entries(convert)) {
			if (currency[curr] == 0 || !("conversion" in currData)) continue;
			const { into, each } = currData.conversion;
			let change = Math.floor(currency[curr] / each);
			currency[curr] -= change * each;
			currency[into] += change;
		}
		return (
			currency.pp * convert.gp.conversion.each +
			currency.gp +
			currency.ep / convert.ep.conversion.each +
			currency.sp / convert.sp.conversion.each / convert.ep.conversion.each +
			currency.cp / convert.cp.conversion.each / convert.sp.conversion.each / convert.ep.conversion.each
		);
	}
    const totalGP = getTotalGP(token.document.actor.data.data);
</script>

<span class="currency-segment">
    <span class="icon" style="background-image: url(icons/svg/coins.svg)"></span> 
    <span>
    {totalGP.toFixed(1)}
    </span>
</span>

<style lang="scss">
    .currency-segment {
        font-size: 18px !important;
        padding: 6px;
        white-space: nowrap;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
