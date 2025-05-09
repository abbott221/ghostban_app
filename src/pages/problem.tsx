import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Eidogo from "./eidogo";


function Problem() {
    let { id } = useParams();

    let problemOneSGF = '(;AP[goproblems]AB[pq]AB[qp]AW[qq]AW[rq]AB[qo]AB[op]AB[qn]C[White to live](;W[pr];B[or](;W[qs](;B[rp]C[CHOICE](;W[rr]C[RIGHT])(;W[sr];B[rs];W[rr];B[os])(;W[sq];B[rr])(;W[rs];B[sr](;W[rr];B[sq])(;W[sq];B[rr]))(;W[ss];B[rr]))(;B[rr]C[CHOICE](;W[sr];B[rs];W[rp];B[ro];W[sp]C[RIGHT])(;W[rp];B[qr])(;W[rs];B[sr]))(;B[sr](;W[rr];B[os](;W[ss](;B[rs];W[sq];B[ps];W[qr]C[RIGHT])(;B[ps];W[qr];B[rs];W[sq]C[RIGHT]))(;W[ps];B[rs](;W[ss]C[ko])(;W[sq];B[qr]))(;W[sq];B[ps](;W[qr];B[ss])(;W[ss];B[qr]C[ko]))(;W[rp];B[ro];W[ss];B[rs];W[sq];B[ps](;W[ss];B[qr]C[ko])(;W[qr];B[sp])))(;W[rp];B[ro];W[rr];B[os](;W[ps];B[rs]C[ko])(;W[ss](;B[ps](;W[sq];B[qr]C[ko])(;W[qr];B[rs]C[ko]))(;B[rs];W[sq];B[ps](;W[ss];B[qr]C[ko])(;W[qr];B[sp])))(;W[sq];B[ps](;W[qr];B[ss])(;W[ss];B[qr]C[ko])))))(;W[qr];B[rp](;W[rs];B[sr];W[sq];B[ps])(;W[sr];B[rs])(;W[ps];B[rs]))(;W[rr];B[ps];W[qs];B[qr]C[ko])(;W[rs];B[ps](;W[qr];B[sr])(;W[sr];B[qr](;W[rr];B[rp])(;W[rp];B[rr]))(;W[rp];B[ro](;W[qr];B[sr])(;W[sr];B[qr](;W[sp];B[rr])(;W[rr];B[sp]))))(;W[ps];B[rs](;W[rr];B[os];W[qr];B[rp])(;W[rp];B[ro](;W[rr];B[os];W[qr];B[sp];W[sq];B[ss])(;W[sp];B[os];W[qr];B[sr])(;W[sr];B[sp])))(;W[rp];B[qr](;W[rr];B[ps];W[rs];B[ro];W[sp];B[sr])(;W[ro];B[rn];W[rr];B[ps](;W[so];B[rs])(;W[rs];B[so];W[sp];B[sr]))))(;W[qr];B[pr](;W[rp];B[ro];W[sr];B[rs](;W[qs];B[sp])(;W[sp];B[qs]))(;W[sr];B[rs](;W[qs];B[rp])(;W[rp];B[ro](;W[sp];B[qs])(;W[qs];B[sp])))(;W[rs];B[sr]))(;W[rp];B[qr];W[rr];B[pr](;W[rs];B[ro];W[sp];B[sr])(;W[ro];B[rn];W[rs];B[so];W[sp];B[sr]))(;W[rs];B[pr](;W[qr];B[sr])(;W[rp];B[ro](;W[qr];B[sr])(;W[sr];B[qr](;W[rr];B[sp])(;W[sp];B[rr])))(;W[sr];B[qr](;W[rr];B[rp])(;W[rp];B[ro](;W[rr];B[sp])(;W[sp];B[rr]))))(;W[sr];B[qr](;W[rr];B[pr](;W[rp];B[ro](;W[sp];B[rs])(;W[rs];B[sp]))(;W[rs];B[rp]))(;W[rs];B[pr](;W[rr];B[rp])(;W[rp];B[ro](;W[sp];B[rr])(;W[rr];B[sp])))(;W[rp];B[ro](;W[rr];B[pr](;W[rs];B[sp])(;W[sp];B[rs]))(;W[rs];B[pr](;W[sp];B[rr])(;W[rr];B[sp]))(;W[sp];B[rr])))(;W[rr];B[pr])(;W[qs];B[pr](;W[qr];B[rp](;W[sr];B[rs])(;W[rs];B[sr]))(;W[rp];B[ro](;W[qr];B[sr])(;W[sr];B[qr]))))'
    let problemTwoSGF = '(;FF[4]GM[1]SZ[19]AB[pa][ra][rc][sb]AW[qa][rb];B[qb]C[RIGHT])'

    let inputString = problemOneSGF

    if (id === "1") {
        inputString = problemOneSGF
    } else if (id === "2") {
        inputString = problemTwoSGF
    }


    useEffect(() => {
        document.addEventListener("goproblems_player.result", function(e) {
            console.log("PROBLEM SUCCESS/FAIL!")
            console.log(e)
            console.log(e["detail"])
        })
    })


    return (
        <div className="container-fluid m-0 p-0">
            <div className="row">
                <div className="d-flex align-items-center justify-content-around m-2 mb-1">
                    <div>
                        <h3>ID: {id}</h3>
                    </div>
                    <div>
                        <Link to="/">
                            <button type="button" className="btn btn-primary">Home</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row m-0 p-0">
                <Eidogo sgfInputString={inputString}/>
            </div>
        </div>
    )
}

export default Problem;