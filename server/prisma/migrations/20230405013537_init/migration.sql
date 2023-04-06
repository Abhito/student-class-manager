-- DropForeignKey
ALTER TABLE "ClassesOnStudent" DROP CONSTRAINT "ClassesOnStudent_classId_fkey";

-- DropForeignKey
ALTER TABLE "ClassesOnStudent" DROP CONSTRAINT "ClassesOnStudent_studentId_fkey";

-- AddForeignKey
ALTER TABLE "ClassesOnStudent" ADD CONSTRAINT "ClassesOnStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassesOnStudent" ADD CONSTRAINT "ClassesOnStudent_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
