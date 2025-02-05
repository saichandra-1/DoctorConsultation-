import { motion } from "framer-motion";

export default function PredictedDiseases({ diseases }: { diseases: string[] }) {
  return (
    <div className="p-5 bg-white text-gray-900 rounded-lg shadow-lg mt-5 w-full sm:w-2/3 mx-auto">
      <h2 className="text-2xl font-semibold text-center">Predicted Diseases</h2>
      {diseases.length === 0 ? (
        <p className="text-center text-gray-500 mt-2">No predictions yet.</p>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="list-disc list-inside mt-3"
        >
          {diseases.map((disease) => (
            <motion.li
              key={disease}
              whileHover={{ scale: 1.05 }}
              className="text-lg p-2"
            >
              {disease}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
