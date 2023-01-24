import mainImage from "../../../assets/pyramidAndPalmTreesAssets/set31_penguin/set31_main.png"
import option1 from "../../../assets/pyramidAndPalmTreesAssets/set31_penguin/set31_option_1.png"
import option2 from "../../../assets/pyramidAndPalmTreesAssets/set31_penguin/set31_option_2.png"
import option3 from "../../../assets/pyramidAndPalmTreesAssets/set31_penguin/set31_option_3.png"
import option4 from "../../../assets/pyramidAndPalmTreesAssets/set31_penguin/set31_option_4.png"

const penguinTest = {
    name: "Penguin Test",
    isAnimated: true,
    cards: [
        {
            image: mainImage,
            isMain: true,
            id: 0
        },
        {
            image: option1,
            isCorrect: false,
            isMain: false,
            selected: false,
            id: 1,
        },
        {
            image: option2,
            isCorrect: false,
            isMain: false,
            selected: false,
            id: 2,
        },
        {
            image: option3,
            isCorrect: true,
            isMain: false,
            selected: false,
            id: 3,
        },
        {
            image: option4,
            isCorrect: false,
            isMain: false,
            selected: false,
            id: 4,
        },
    ],
    columns: 2,
    results: {}
}

export default penguinTest;