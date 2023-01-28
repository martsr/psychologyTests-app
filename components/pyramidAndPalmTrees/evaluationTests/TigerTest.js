import mainImage from "../../../assets/pyramidAndPalmTreesAssets/set60_tiger/set60_main.png"
import option1 from "../../../assets/pyramidAndPalmTreesAssets/set60_tiger/set60_option_1.png"
import option2 from "../../../assets/pyramidAndPalmTreesAssets/set60_tiger/set60_option_2.png"
import option3 from "../../../assets/pyramidAndPalmTreesAssets/set60_tiger/set60_option_3.png"
import option4 from "../../../assets/pyramidAndPalmTreesAssets/set60_tiger/set60_option_4.png"

const tigerTest = {
    name: "Tiger Test",
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
            isCorrect: true,
            isMain: false,
            selected: false,
            id: 2,
        },
        {
            image: option3,
            isCorrect: false,
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

export default tigerTest;