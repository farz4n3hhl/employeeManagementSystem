%%writefile parallel_impl_s.cpp

#include <opencv2/highgui.hpp>
#include "opencv2/imgproc/imgproc_c.h"

#include <iostream>
#include <time.h>
#include <omp.h>

using namespace cv;
using namespace std;

int main() {
    int window_size = 10;
    int l = window_size/2;
    int times = 10;
    Mat image;
    image = imread("/image2.png");

    double start_time = omp_get_wtime();

    Mat temp = image.clone();

    int num = 0, rows = image.rows, cols = image.cols;

    cout << "Image rows: " << rows; 
    cout << "Image cols: " << cols << "\n";
    int x = rows / 1;
    int y = cols / 1;
    //omp_set_dynamic(0);
    //omp_set_nested(1);
    while (num < times) {
        for (int i = 0; i < rows ; i++) {
            #pragma omp parallel for schedule(dynamic)
            for (int j = 0; j <= cols; j++) {
                int window_sum_b = 0;
                int window_sum_g = 0;
                int window_sum_r = 0;
                for (int q = 0; q < window_size; q++) {
                    for (int z = 0 ; z < window_size; z++) {
                        window_sum_b += temp.at<cv::Vec3b>(i+q-l, j+z-l)[0];
                        window_sum_g +=  temp.at<cv::Vec3b>(i+q-l, j+z-l)[1];
                        window_sum_r += temp.at<cv::Vec3b>(i+q-l, j+z-l)[2];
                    }
                }
                temp.at<cv::Vec3b>(i, j)[0] = window_sum_b / (window_size*window_size);
                temp.at<cv::Vec3b>(i,j)[1] = window_sum_g / (window_size*window_size);
                temp.at<cv::Vec3b>(i,j)[2] = window_sum_r / (window_size*window_size);
            }
        }
        
        num++;
    }

    cout << "\n Process time: " << (omp_get_wtime() - start_time) * 1000.0 << " ms" << endl;

    imwrite("/content/parallel4.png", temp);

    return 0;
}
