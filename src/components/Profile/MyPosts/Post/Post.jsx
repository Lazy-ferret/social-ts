import React from "react";
import s from './Post.module.css'

export default function Post(props) {
    const { message, likesCount } = props

    return (


        <div className={s.item}>
            <img alt='avatar' src='https://yandex-images.clstorage.net/96wwo3g86/bc1094jtm/Jk0cE527LzZMVaiaYX_jG4rf1ZadrTL3zK0cIq9mnaHz0bk0HojY1F0g8ZLEsxYu9N5B1OWi5rbQeZsFhL5DFxdcSRr8ui9TTGHRphlvlj_OnrmagbEW1oTIYW6SJpH4tqS5HVeMjbR90UkPJXqym3R_mBUcp7vDpGX-NJGL-qciCUR_xbPmZjhZyb4xG89Liq41GpXkztqgBS1_N0MIRNLEnFFnhJgl4REFs4H27r9wXzht4EujX-h9N7CRUxq64tEoGxEbVpb8ed0K7VvXry6uURZJOArKLAEZP1vPkHgiuKxB0_QUSZE9PW8tOt7zcDNgmbx_cz8god_ASQcqkq4NEHtZ32bqrKWBGmGzGyf-riFOSWgulviZCYvvy8j88vCoIStQAFUtvYVvYdqaT_jvpNnEi6eruMnXGBHLRsa2NcwjSbeyluzh9Woh24_rrga9ihnUtmZ8rc3DQ4e4-Abw4EUPiISJsT1hx4Eyxqssc7B1zM_Xy7zFW7z1B1qGeplc1xV7wtZgdTX2xaPTn5L2eTqVVG5GhB2JY--36HT2pOQRc1DogSVljbuZdorv4BOgafyXd0eY4Q9saX9GOhoJHHexx86K4Pm9nmXb54euIrXquWya_uCtXbfjg0hwApy4wZ_olNVhod0fdaaqk7CbLClsp7MrKKkrrBXPQnISmZQL0TtqXmBRuXLZM28_ogbRdpV40oIMDYlz-2tUyL64uEHbzHQJmYWNPz3uEuco47gdkM_n0yBZLzDhy4I6ilXcY82Thp6QbYVKtevvX1a6IQY1pBre6M2VG8tz4IjahGDRi_AkSSUxpZ-NOgYTBPeopYDjO1N0qQsYzUeSssrZoPd9J1LmaO2FNp1PF2PWskGmTWRaaqydkcuDPzS47kh0KfNU_KkpifWzncIKr2hrALU4Dx8fmNkvMGVXru4qraxX-cdWUjjB4XoJV-O_WhZZku00CprsRaEzj4u8' />
            {message}
            <div>
                <span>like</span>
                <span>{likesCount}</span>
            </div>


        </div>

    )
}