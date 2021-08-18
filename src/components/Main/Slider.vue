<template>
  <section class="content bg-db">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <div>
            <img src="../../assets/img/site.png" class="site" alt="site">
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 ">
          <div class="inputs-wrapper  inputs-wrapper--material flex-column px-3 py-2 len">
            <div class="row" style="margin-top:6px">
              <h3 style="margin: 3px auto"> Kalkulyator</h3>
              <div class="col-md-12 justify-content-start">

                <label for="countriesSelect">Ölkə </label>
                <select class="form-control b-input" id="countriesSelect" name="countriesSelect">
                  <option data-id="1" value="tr">Türkiyə</option>
                </select>
              </div>
              <div class="col-md-12 justify-content-start">
                <div class=" b-input d-flex justify-content-between">
                  <div></div>
                  <div class="d-flex mt-20">
<!--						    	<span class="ws-nowrap mr-1">Maye məhsul</span>-->
                    <div class=" ">
                      <input type="checkbox" id="liquid" name="liquid-product">
                      <label class="form-check-label" for="liquid"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col-md-12  justify-content-start">
                <div class=" f-1 ws-nowrap ">
                  <label>Çəki (kq)</label>
                  <input class="form-control b-input" id="wght" name="cargo_weight_input">
                </div>
              </div>
              <div class="col-md-6  justify-content-start">
                <div class=" f-2 ws-nowrap ">
                  <label>Uzunluq (sm)</label>
                  <input class="form-control b-input" id="length" name="cargo_l_input">
                </div>
              </div>
              <div class="col-md-6  justify-content-center">
                <div class="f-2 ws-nowrap ">
                  <label>En (sm)</label>
                  <input class="form-control b-input" id="width" name="cargo_w_input">
                </div>
              </div>
              <div class="col-md-12  justify-content-end">
                <div class=" f-2 ws-nowrap ">
                  <label>Hündürlük (sm)</label>
                  <input class="form-control b-input" id="height" name="cargo_h_input">
                </div>
              </div>
            </div>
            <div class="row flex-row justify-content-between pt-3 m-0">
              <div class="fullCenter p-0">
<!--                <button onclick="calculatePrice();" class=" main-button calculateButton" data-currency="1.7">Hesabla-->
<!--                </button>-->
              </div>

              <!--<div class="fullCenter p-0">-->
              <!--	<p class="text-center mt-4 calculateLabel">-->
              <!--		Yekun Məbləğ:<span class="bold main-color">0.00</span>-->
              <!--	</p>-->
              <!--</div>-->
              <strong id="getnum" style="font-size:20px"></strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Slider"
}
</script>

<style scoped>

</style>
