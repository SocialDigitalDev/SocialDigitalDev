export default {
    methods: {
        buildImage(image, width, height) {
            if (!image || !width || !height) return false;

            image = image.toLowerCase().trim()
                .replace(/~/g, '')
                .replace(/#width#/g, width)
                .replace(/#height#/g, height);

            return `https://tfcqav.vteximg.com.br${(/<img.*?src="(.*?)"/).exec(image)[1]}`;
        },
    },
};
