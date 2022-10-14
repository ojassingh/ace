import { Card} from "flowbite-react";
import { motion } from "framer-motion";

const PersonCard = (props) => {
    return(<motion.div whileHover={{scale : 1.05}} className="m-2 w-96">
        <div className="max-w-sm">
            <Card>
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                <motion.img
                    // whileHover={{scale : 1.2}}
                    className="mb-3 h-52 w-52 object-cover rounded-full shadow-lg"
                    src={props.src}
                    alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {props.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {props.role}
                </span>
                </div>
            </Card>
            </div>
    </motion.div>)
}

export default PersonCard;