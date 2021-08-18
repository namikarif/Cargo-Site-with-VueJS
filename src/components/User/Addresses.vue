<template>
  <div class="tracking-block">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" href="#address_0" aria-controls="track-by-number"
           role="tab" data-toggle="tab" style="margin-left:0px">Türkiyə</a>
      </li>
    </ul>
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="address_0">
        <div class="put-reference-number">
          <form action="">
            <div class="form-group">
              <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Ad,Soyad:</label>
                    <div class="input-group ">
                      <p id="cargo">Cargo Diem</p>
                    </div>

                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Adres Başlığı:</label>
                    <div class="input-group ">
                      <p>Cargodiem - 100005</p>
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Azərbaycan, Bakı:</label>
                    <div class="input-group ">
                      <p> Türkiyə</p>


                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">İlçe:</label>
                    <div class="input-group ">
                      <p>Bahçelievler</p>

                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Posta kodu:</label>
                    <div class="input-group ">
                      <p>34194</p>

                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Telefon:</label>
                    <div class="form-group ">
                      <p style="color:black">+90 553 782 12 12</p>

                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">

                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">İl:</label>
                    <div class="input-group ">
                      <p>İstanbul</p>

                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">TC:</label>
                    <div class="form-group ">
                      <p style="color:black">99989145420</p>
                    </div>

                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Adres:</label>
                    <div class="input-group ">
                      <p id="address">Fevzi Çakmak mah. Çakmak sokak Çakmak Ap. No 6C Namig
                        Abdukarimov/100005</p>
                      <a class="copy-text text-white" data-clipboard-target="#address" href="#"><i
                          class="fa fa-copy"></i> Copy</a>

                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-12">
                    <label style="border-bottom:1px solid black">Vergi No:</label>
                    <div class="form-group ">
                      <p style="color:black">2030716413</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Addresses"
}
</script>

<style scoped>
.input-group p, .form-group p {
  cursor: pointer;
}
</style>
